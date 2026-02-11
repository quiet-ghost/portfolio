import type { PortfolioClientData } from "@/types/portfolio";
import { createMainRenderers } from "./mainRenderers";

const CLIENT_DATA_ELEMENT_ID = "portfolio-client-data";
const TURNSTILE_CONFIG_ENDPOINT = "/api/turnstile";
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_ACTION = "contact_form";

type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "auto" | "dark" | "light";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (errorCode?: string) => void;
};

interface TurnstileApi {
  render: (
    container: string | HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<TurnstileApi | null> | null = null;

const loadTurnstileApi = async (): Promise<TurnstileApi | null> => {
  if (window.turnstile) return window.turnstile;
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise((resolve) => {
    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => resolve(window.turnstile ?? null),
        { once: true },
      );
      existingScript.addEventListener("error", () => resolve(null), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile ?? null);
    script.onerror = () => resolve(null);
    document.head.append(script);
  });

  return turnstileScriptPromise;
};

const fetchTurnstileSiteKey = async (): Promise<string> => {
  try {
    const response = await fetch(TURNSTILE_CONFIG_ENDPOINT, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) return "";

    const payload = (await response.json()) as Record<string, unknown>;
    const siteKey =
      typeof payload.siteKey === "string" ? payload.siteKey.trim() : "";
    return siteKey;
  } catch {
    return "";
  }
};

const parseClientData = (): PortfolioClientData | null => {
  const dataScript = document.getElementById(CLIENT_DATA_ELEMENT_ID);
  if (!(dataScript instanceof HTMLScriptElement)) return null;

  const raw = dataScript.textContent?.trim();
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PortfolioClientData;
  } catch {
    return null;
  }
};

const initPortfolioApp = (data: PortfolioClientData): void => {
  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

  const typeInto = async (
    element: Element | null,
    text: string,
    speed = 20,
  ): Promise<void> => {
    if (!element) return;

    element.textContent = "";
    for (const char of text) {
      element.textContent += char;
      await sleep(speed);
    }
  };

  const {
    typedName,
    typedHeadline,
    typedAbout,
    emailHref,
    projectsData,
    experienceData,
    educationData,
  } = data;

  const commandEl = document.querySelector("[data-typed-command]");
  const commandCursorEl = document.querySelector("[data-command-cursor]");
  const outputNameEl = document.querySelector("[data-output-name]");
  const outputHeadlineEl = document.querySelector("[data-output-headline]");
  const outputAboutEl = document.querySelector("[data-output-about]");
  const statusEl = document.querySelector("[data-status-line]");
  const lsPromptEl = document.querySelector("[data-ls-prompt]");
  const typedLsEl = document.querySelector("[data-typed-ls]");
  const lsCursorEl = document.querySelector("[data-ls-cursor]");
  const lsOutputEl = document.querySelector("[data-ls-output]");
  const lsRows = Array.from(document.querySelectorAll(".ls-row"));
  const lsPermissions = Array.from(
    document.querySelectorAll<HTMLElement>(".ls-row .perm"),
  );
  const mainOutput = document.querySelector("[data-main-output]");
  const readyPrompt = document.querySelector("[data-ready-prompt]");
  const readyInput = document.querySelector("[data-ready-input]");
  const readyPath = document.querySelector("[data-ready-path]");
  const mainBody = document.querySelector("[data-main-body]");
  const contactStatusEl = document.querySelector<HTMLElement>(
    "[data-contact-status]",
  );
  const contactFormEl = document.querySelector<HTMLFormElement>(
    "[data-contact-form]",
  );
  const turnstileSlotEl = document.querySelector<HTMLElement>(
    "[data-turnstile-slot]",
  );
  const rootPath = "~/dev";
  let currentPath = rootPath;
  let turnstileWidgetId: string | null = null;
  let turnstileToken = "";
  let turnstileReady = false;
  let turnstileFailureMessage = "";
  let turnstileInitInFlight: Promise<void> | null = null;

  const setMainPath = (path: string): void => {
    currentPath = path;
    if (readyPath instanceof HTMLElement) readyPath.textContent = path;
  };

  const mainPathFor = (name: string): string => {
    if (name === "projects") return `${rootPath}/projects`;
    if (name === "experience") return `${rootPath}/experience`;
    if (name === "education") return `${rootPath}/education`;
    return rootPath;
  };

  const setContactStatus = (
    message: string,
    tone: "muted" | "pending" | "success" | "error" = "muted",
  ): void => {
    if (!(contactStatusEl instanceof HTMLElement)) return;

    contactStatusEl.textContent = message;
    contactStatusEl.classList.remove("is-pending", "is-success", "is-error");

    if (tone === "pending") contactStatusEl.classList.add("is-pending");
    if (tone === "success") contactStatusEl.classList.add("is-success");
    if (tone === "error") contactStatusEl.classList.add("is-error");
  };

  const turnstileClientErrorMessage = (errorCode = ""): string => {
    if (errorCode.startsWith("110200")) {
      return "turnstile domain not authorized (add localhost/127.0.0.1 in widget hostnames)";
    }
    if (errorCode.startsWith("110100") || errorCode.startsWith("110110")) {
      return "turnstile site key is invalid. check TURNSTILE_SITE_KEY";
    }
    if (errorCode.startsWith("102") || errorCode.startsWith("106")) {
      return "turnstile widget config invalid. review widget parameters";
    }
    return "verification error. please retry";
  };

  const initContactTurnstile = async (): Promise<void> => {
    if (!(contactFormEl instanceof HTMLFormElement)) return;
    if (!(turnstileSlotEl instanceof HTMLElement)) return;

    if (turnstileReady && turnstileWidgetId) return;

    if (turnstileInitInFlight) {
      await turnstileInitInFlight;
      return;
    }

    const initTask = async (): Promise<void> => {
      turnstileFailureMessage = "";
      setContactStatus("loading verification...", "pending");

      const siteKey = await fetchTurnstileSiteKey();
      if (!siteKey) {
        turnstileFailureMessage =
          "verification unavailable. use direct email link";
        setContactStatus(turnstileFailureMessage, "error");
        return;
      }

      const turnstileApi = await loadTurnstileApi();
      if (!turnstileApi) {
        turnstileFailureMessage =
          "verification failed to load. retry in a moment";
        setContactStatus(turnstileFailureMessage, "error");
        return;
      }

      try {
        turnstileWidgetId = turnstileApi.render(turnstileSlotEl, {
          sitekey: siteKey,
          theme: "dark",
          action: TURNSTILE_ACTION,
          callback: (token: string) => {
            turnstileToken = token;
            setContactStatus("verification complete. ready to send", "success");
          },
          "expired-callback": () => {
            turnstileToken = "";
            setContactStatus("verification expired. please retry", "error");
          },
          "error-callback": (errorCode?: string) => {
            turnstileToken = "";
            turnstileFailureMessage = turnstileClientErrorMessage(errorCode);
            setContactStatus(turnstileFailureMessage, "error");
          },
        });

        turnstileReady = true;
        setContactStatus("complete verification, then send", "muted");
      } catch {
        turnstileFailureMessage = "verification failed to initialize";
        setContactStatus(turnstileFailureMessage, "error");
      }
    };

    turnstileInitInFlight = initTask().finally(() => {
      turnstileInitInFlight = null;
    });
    await turnstileInitInFlight;
  };

  setMainPath(rootPath);

  const runBoot = async (): Promise<void> => {
    await typeInto(commandEl, "whoami", 62);
    await sleep(170);
    await typeInto(outputNameEl, typedName, 24);
    await sleep(120);
    await typeInto(outputHeadlineEl, typedHeadline, 16);
    await sleep(140);
    await typeInto(outputAboutEl, typedAbout, 8);

    if (commandCursorEl instanceof HTMLElement) commandCursorEl.hidden = true;
    if (statusEl instanceof HTMLElement) statusEl.hidden = false;

    if (lsPromptEl instanceof HTMLElement) {
      lsPromptEl.hidden = false;
      await sleep(130);
      await typeInto(typedLsEl, "ls", 76);
      if (lsCursorEl instanceof HTMLElement) lsCursorEl.hidden = true;
    }

    if (lsOutputEl instanceof HTMLElement) {
      lsOutputEl.hidden = false;
      for (const row of lsRows) {
        await sleep(58);
        row.classList.add("is-visible");
      }
    }

    if (readyPrompt instanceof HTMLElement) readyPrompt.hidden = false;
  };

  const permissionClass = (char: string, index: number): string => {
    if (index === 0) {
      if (char === "d") return "perm-type-dir";
      return "perm-type-file";
    }

    if (char === "r") return "perm-read";
    if (char === "w") return "perm-write";
    if (char === "x") return "perm-exec";
    return "perm-dash";
  };

  const stylizePermissions = (): void => {
    lsPermissions.forEach((permissionEl) => {
      const rawValue = permissionEl.textContent?.trim();
      if (!rawValue || permissionEl.dataset.styled === "true") return;

      permissionEl.dataset.styled = "true";
      permissionEl.textContent = "";

      Array.from(rawValue).forEach((char, index) => {
        const part = document.createElement("span");
        part.className = `perm-char ${permissionClass(char, index)}`;
        part.textContent = char;
        permissionEl.append(part);
      });
    });
  };

  stylizePermissions();

  const promptLine = (
    command: string,
    pathText = currentPath,
  ): HTMLParagraphElement => {
    const p = document.createElement("p");
    p.className = "prompt-line";

    const path = document.createElement("span");
    path.className = "prompt-path";
    path.textContent = pathText;
    p.append(path);

    const branch = document.createElement("span");
    branch.className = "prompt-branch";
    branch.textContent = " dev";
    p.append(branch);

    const mark = document.createElement("span");
    mark.className = "prompt-mark";
    mark.textContent = " ❯ ";
    p.append(mark);

    const cmd = document.createElement("span");
    cmd.textContent = command;
    p.append(cmd);

    return p;
  };

  const { renderProjects, renderExperience, renderEducation } =
    createMainRenderers({
      projectsData,
      experienceData,
      educationData,
    });

  let commandQueue: Promise<void> = Promise.resolve();

  const queueCommand = (
    command: string,
    renderer: () => DocumentFragment,
    nextPath = currentPath,
  ): void => {
    commandQueue = commandQueue.then(async () => {
      if (!(mainOutput instanceof HTMLElement)) return;
      const pathAtRun = currentPath;

      if (readyInput instanceof HTMLElement) {
        readyInput.textContent = "";
        await typeInto(readyInput, command, 18);
      }

      await sleep(60);
      mainOutput.append(promptLine(command, pathAtRun));
      mainOutput.append(renderer());

      if (nextPath !== currentPath) {
        setMainPath(nextPath);
      }

      if (readyInput instanceof HTMLElement) readyInput.textContent = "";
      if (mainBody instanceof HTMLElement)
        mainBody.scrollTop = mainBody.scrollHeight;
    });
  };

  const layout = document.querySelector(".layout");
  const topRow = document.querySelector("[data-top-row]");
  const firstSlot = document.querySelector("[data-first-slot]");
  const stack = document.querySelector("[data-stack]");
  const pool = document.querySelector(".window-pool");
  const panelEntries = Array.from(
    document.querySelectorAll<HTMLElement>(".window-pool [data-window]"),
  );
  const panelByName = new Map<string, HTMLElement>();

  panelEntries.forEach((panel) => {
    const name = panel.getAttribute("data-window");
    if (name) panelByName.set(name, panel);
  });

  const bootPanel = document.querySelector<HTMLElement>("[data-focus='boot']");

  let openOrder: string[] = [];
  let focusedName = "boot";
  let draggingName: string | null = null;

  const getVisiblePanels = (): HTMLElement[] =>
    openOrder
      .map((name) => panelByName.get(name))
      .filter((panel): panel is HTMLElement => Boolean(panel));

  const allTerminals = (): HTMLElement[] =>
    [bootPanel, ...getVisiblePanels()].filter((panel): panel is HTMLElement =>
      Boolean(panel),
    );

  const setFocused = (name: string): void => {
    allTerminals().forEach((panel) => panel.classList.remove("is-focused"));

    if (name === "boot") {
      bootPanel?.classList.add("is-focused");
      focusedName = "boot";
      return;
    }

    if (openOrder.includes(name)) {
      panelByName.get(name)?.classList.add("is-focused");
      focusedName = name;
      return;
    }

    bootPanel?.classList.add("is-focused");
    focusedName = "boot";
  };

  const snapshotRects = (): Map<string, DOMRect> => {
    const rects = new Map<string, DOMRect>();
    openOrder.forEach((name) => {
      const panel = panelByName.get(name);
      if (!panel || panel.hidden) return;
      rects.set(name, panel.getBoundingClientRect());
    });
    return rects;
  };

  const animatePanels = (previousRects: Map<string, DOMRect>): void => {
    getVisiblePanels().forEach((panel) => {
      const name = panel.getAttribute("data-window");
      if (!name) return;

      const prev = previousRects.get(name);
      const next = panel.getBoundingClientRect();

      if (!prev) {
        panel.classList.add("is-entering");
        window.requestAnimationFrame(() =>
          panel.classList.remove("is-entering"),
        );
        return;
      }

      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      const sx = prev.width / next.width;
      const sy = prev.height / next.height;

      if (
        Math.abs(dx) < 0.5 &&
        Math.abs(dy) < 0.5 &&
        Math.abs(1 - sx) < 0.02 &&
        Math.abs(1 - sy) < 0.02
      ) {
        return;
      }

      panel.style.transition = "none";
      panel.style.transformOrigin = "top left";
      panel.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;

      window.requestAnimationFrame(() => {
        panel.style.transition =
          "transform 320ms var(--ease-spring), opacity 220ms ease";
        panel.style.transform = "";
      });
    });

    window.setTimeout(() => {
      getVisiblePanels().forEach((panel) => {
        panel.style.transition = "";
        panel.style.transformOrigin = "";
      });
    }, 360);
  };

  const renderPanes = (previousRects = new Map<string, DOMRect>()): void => {
    if (
      !(firstSlot instanceof HTMLElement) ||
      !(stack instanceof HTMLElement) ||
      !(topRow instanceof HTMLElement) ||
      !(pool instanceof HTMLElement)
    ) {
      return;
    }

    firstSlot.innerHTML = "";
    stack.innerHTML = "";

    const hasSplit = openOrder.length > 0;
    const hasStack = openOrder.length > 1;
    const primaryPane = openOrder[0] || "";

    firstSlot.hidden = !hasSplit;
    topRow.classList.toggle("has-split", hasSplit);
    topRow.dataset.primaryPane = primaryPane;
    layout?.classList.toggle("has-stack", hasStack);

    openOrder.forEach((name, index) => {
      const panel = panelByName.get(name);
      if (!panel) return;

      panel.hidden = false;
      panel.classList.add("is-open");
      panel.classList.remove("is-dragging", "is-drop-target");

      if (index === 0) {
        firstSlot.appendChild(panel);
      } else {
        stack.appendChild(panel);
      }
    });

    panelByName.forEach((panel, name) => {
      if (openOrder.includes(name)) return;
      panel.hidden = true;
      panel.classList.remove(
        "is-open",
        "is-dragging",
        "is-drop-target",
        "is-entering",
      );
      pool.appendChild(panel);
    });

    stack.dataset.openCount = String(Math.max(0, openOrder.length - 1));
    animatePanels(previousRects);
    setFocused(focusedName);
  };

  const openPane = (name: string, shouldScroll = false): void => {
    if (!panelByName.has(name)) return;

    if (openOrder.includes(name)) {
      setFocused(name);
      if (name === "contact") {
        window.requestAnimationFrame(() => {
          void initContactTurnstile();
        });
      }
      if (shouldScroll)
        panelByName
          .get(name)
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const previousRects = snapshotRects();
    openOrder = [...openOrder, name];
    focusedName = name;
    renderPanes(previousRects);

    if (name === "contact") {
      window.requestAnimationFrame(() => {
        void initContactTurnstile();
      });
    }

    if (shouldScroll)
      panelByName
        .get(name)
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const closePane = (name: string): void => {
    if (!openOrder.includes(name)) return;

    const previousRects = snapshotRects();
    openOrder = openOrder.filter((entry) => entry !== name);

    if (focusedName === name) {
      focusedName = openOrder.length ? openOrder[openOrder.length - 1] : "boot";
    }

    renderPanes(previousRects);
  };

  setFocused("boot");

  allTerminals().forEach((terminal) => {
    const focusName = terminal.getAttribute("data-focus") || "boot";
    terminal.addEventListener("pointerenter", () => setFocused(focusName));
    terminal.addEventListener("pointerdown", () => setFocused(focusName));
  });

  panelByName.forEach((panel, name) => {
    panel.addEventListener("pointerenter", () => setFocused(name));
    panel.addEventListener("pointerdown", () => setFocused(name));

    panel.addEventListener("dragstart", (event) => {
      if (!openOrder.includes(name)) {
        event.preventDefault();
        return;
      }

      draggingName = name;
      panel.classList.add("is-dragging");
      setFocused(name);

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", name);
      }
    });

    panel.addEventListener("dragend", () => {
      panel.classList.remove("is-dragging");
      panelByName.forEach((target) =>
        target.classList.remove("is-drop-target"),
      );
      draggingName = null;
    });

    panel.addEventListener("dragover", (event) => {
      if (!draggingName || draggingName === name || !openOrder.includes(name))
        return;
      event.preventDefault();
      panel.classList.add("is-drop-target");
    });

    panel.addEventListener("dragleave", () => {
      panel.classList.remove("is-drop-target");
    });

    panel.addEventListener("drop", (event) => {
      if (!draggingName || draggingName === name || !openOrder.includes(name))
        return;
      event.preventDefault();

      const fromIndex = openOrder.indexOf(draggingName);
      const toIndex = openOrder.indexOf(name);
      if (fromIndex < 0 || toIndex < 0) return;

      const previousRects = snapshotRects();
      const next = [...openOrder];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      openOrder = next;

      renderPanes(previousRects);
      setFocused(draggingName);
      panelByName.forEach((target) =>
        target.classList.remove("is-drop-target"),
      );
    });
  });

  const runMainByName = (name: string): void => {
    setFocused("boot");

    if (name === "projects") {
      queueCommand("ls -a projects", renderProjects, mainPathFor("projects"));
      return;
    }

    if (name === "experience") {
      queueCommand(
        "ls -a experience",
        renderExperience,
        mainPathFor("experience"),
      );
      return;
    }

    if (name === "education") {
      queueCommand(
        "ls -a education",
        renderEducation,
        mainPathFor("education"),
      );
    }
  };

  document.querySelectorAll<HTMLElement>("[data-run-main]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const name = item.getAttribute("data-run-main");
      if (!name) return;
      runMainByName(name);
    });
  });

  document.querySelectorAll<HTMLElement>("[data-open-pane]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const pane = item.getAttribute("data-open-pane");
      if (!pane) return;
      openPane(pane, true);
    });
  });

  document
    .querySelectorAll<HTMLElement>("[data-close-window]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const pane = button.getAttribute("data-close-window");
        if (!pane) return;
        closePane(pane);
      });
    });

  document
    .querySelector("[data-close-focused]")
    ?.addEventListener("click", () => {
      if (focusedName === "boot") return;
      closePane(focusedName);
    });

  contactFormEl?.addEventListener("submit", (event) => {
      const submit = async (): Promise<void> => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!(form instanceof HTMLFormElement)) return;

        const formData = new FormData(form);
        const company = String(formData.get("company") || "").trim();
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (company) {
          setContactStatus("message blocked", "error");
          return;
        }

        if (!name || !email || !message) {
          setContactStatus("name, email, and message are required", "error");
          return;
        }

        if (!turnstileReady || !turnstileWidgetId || !window.turnstile) {
          await initContactTurnstile();
        }

        if (!turnstileReady || !turnstileWidgetId || !window.turnstile) {
          setContactStatus(
            turnstileFailureMessage || "verification is still loading",
            "error",
          );
          return;
        }

        const verificationToken =
          window.turnstile.getResponse(turnstileWidgetId) || turnstileToken;

        if (!verificationToken) {
          setContactStatus(
            turnstileFailureMessage || "complete verification challenge first",
            "error",
          );
          return;
        }

        const submitButton = form.querySelector<HTMLButtonElement>(
          "button[type='submit']",
        );
        if (submitButton) submitButton.disabled = true;

        setContactStatus("sending message...", "pending");

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              message,
              company,
              turnstileToken: verificationToken,
            }),
          });

          let payload: Record<string, unknown> | null = null;
          try {
            payload = (await response.json()) as Record<string, unknown>;
          } catch {
            payload = null;
          }

          const isSuccess = payload?.success === true;
          if (!response.ok || !isSuccess) {
            const apiError =
              payload && typeof payload.error === "string" ? payload.error : "";
            setContactStatus(
              apiError || "could not send message right now",
              "error",
            );
            return;
          }

          const warning =
            payload && typeof payload.warning === "string" ? payload.warning : "";

          setContactStatus(
            warning
              ? `sent, but auto-reply may have failed (${warning})`
              : "message sent. auto-reply should hit your inbox soon",
            warning ? "muted" : "success",
          );

          form.reset();
          turnstileToken = "";
          window.turnstile.reset(turnstileWidgetId);
        } catch {
          setContactStatus("network issue, please retry or use direct email", "error");
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      };

      void submit();
    });

  const isTypingTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;

    return (
      target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT"
    );
  };

  window.addEventListener("keydown", (event) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    )
      return;
    if (isTypingTarget(event.target)) return;

    const key = event.key.toLowerCase();

    if (key === "1") {
      event.preventDefault();
      runMainByName("projects");
      return;
    }

    if (key === "2") {
      event.preventDefault();
      runMainByName("experience");
      return;
    }

    if (key === "3") {
      event.preventDefault();
      runMainByName("education");
      return;
    }

    if (key === "4") {
      event.preventDefault();
      openPane("contact", true);
      return;
    }

    if (key === "s") {
      event.preventDefault();
      openPane("socials", true);
      return;
    }

    if (key === "r") {
      event.preventDefault();
      openPane("resume", true);
      return;
    }

    if (key === "e") {
      event.preventDefault();
      window.location.href = emailHref;
      return;
    }

    if (key === "x") {
      event.preventDefault();
      if (focusedName !== "boot") closePane(focusedName);
    }
  });

  void runBoot();
};

const bootPortfolioApp = (): void => {
  const clientData = parseClientData();
  if (!clientData) return;
  initPortfolioApp(clientData);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootPortfolioApp, {
    once: true,
  });
} else {
  bootPortfolioApp();
}
