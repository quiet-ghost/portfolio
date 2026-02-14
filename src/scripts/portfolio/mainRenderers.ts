import type { EducationData, ExperienceData, ProjectData } from "@/types/portfolio";

interface RendererInput {
  projectsData: ProjectData[];
  experienceData: ExperienceData[];
  educationData: EducationData[];
}

type CardMetaPair = {
  label: string;
  value?: string;
};

type CardLink = {
  label: string;
  href: string;
};

interface CardInput {
  title: string;
  subtitle?: string;
  status?: string;
  metaPairs?: CardMetaPair[];
  bodyLines?: string[];
  tags?: string[];
  links?: CardLink[];
}

const sectionIntro = (title: string, detail: string): HTMLDivElement => {
  const wrap = document.createElement("div");
  wrap.className = "stream-intro";

  const heading = document.createElement("p");
  heading.className = "line iris";
  heading.textContent = title;
  wrap.append(heading);

  const meta = document.createElement("p");
  meta.className = "line muted";
  meta.textContent = detail;
  wrap.append(meta);

  return wrap;
};

const statusClass = (status: string): string => {
  if (status === "active" || status === "completed") return "stream-status-active";
  if (status === "in-progress") return "stream-status-progress";
  return "stream-status-archived";
};

const toKindLabel = (kind: string): string => {
  if (kind === "certification") return "cert";
  if (kind === "course") return "course";
  return kind;
};

const makeCard = ({
  title,
  subtitle,
  status,
  metaPairs = [],
  bodyLines = [],
  tags = [],
  links = [],
}: CardInput): HTMLElement => {
  const card = document.createElement("article");
  card.className = "stream-card";

  const head = document.createElement("div");
  head.className = "stream-card-head";

  const titleWrap = document.createElement("div");
  titleWrap.className = "stream-title-wrap";

  const titleEl = document.createElement("p");
  titleEl.className = "stream-title";
  titleEl.textContent = title;
  titleWrap.append(titleEl);

  if (subtitle) {
    const subtitleEl = document.createElement("p");
    subtitleEl.className = "stream-subtitle";
    subtitleEl.textContent = subtitle;
    titleWrap.append(subtitleEl);
  }

  head.append(titleWrap);

  if (status) {
    const statusEl = document.createElement("span");
    statusEl.className = `stream-status ${statusClass(status)}`;
    statusEl.textContent = status;
    head.append(statusEl);
  }

  card.append(head);

  if (metaPairs.length > 0) {
    const meta = document.createElement("dl");
    meta.className = "stream-meta";

    metaPairs.forEach((entry) => {
      if (!entry?.value) return;

      const row = document.createElement("div");
      row.className = "stream-meta-row";

      const key = document.createElement("dt");
      key.textContent = entry.label;

      const value = document.createElement("dd");
      value.textContent = entry.value;

      row.append(key, value);
      meta.append(row);
    });

    if (meta.childElementCount > 0) {
      card.append(meta);
    }
  }

  if (bodyLines.length > 0) {
    const list = document.createElement("ul");
    list.className = "stream-lines";

    bodyLines.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      list.append(item);
    });

    card.append(list);
  }

  if (tags.length > 0) {
    const tagsList = document.createElement("ul");
    tagsList.className = "stream-tags";

    tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      tagsList.append(li);
    });

    card.append(tagsList);
  }

  if (links.length > 0) {
    const linksWrap = document.createElement("div");
    linksWrap.className = "stream-links";

    links.forEach((entry) => {
      const link = document.createElement("a");
      link.href = entry.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = entry.label;
      linksWrap.append(link);
    });

    card.append(linksWrap);
  }

  return card;
};

export const createMainRenderers = ({ projectsData, experienceData, educationData }: RendererInput) => {
  const completedEducation = educationData.filter((item) => item.status === "completed").length;
  const inProgressEducation = educationData.filter((item) => item.status === "in-progress").length;
  const certificationCount = educationData.filter((item) => item.kind === "certification").length;

  const renderProjects = (): DocumentFragment => {
    const frag = document.createDocumentFragment();
    frag.append(sectionIntro("projects", `${projectsData.length} items`));

    projectsData.forEach((item) => {
      frag.append(
        makeCard({
          title: item.title,
          subtitle: item.summary,
          status: item.status,
          tags: item.technologies,
          links: [
            { label: "source", href: item.repository },
            ...(item.liveUrl ? [{ label: "live", href: item.liveUrl }] : []),
          ],
        }),
      );
    });

    return frag;
  };

  const renderExperience = (): DocumentFragment => {
    const frag = document.createDocumentFragment();
    frag.append(sectionIntro("experience", `${experienceData.length} roles in chronological order`));

    experienceData.forEach((item) => {
      const isCurrent = /current|present/i.test(item.period);

      frag.append(
        makeCard({
          title: item.role,
          subtitle: item.organization,
          status: isCurrent ? "active" : undefined,
          metaPairs: [
            { label: "period", value: item.period },
            { label: "location", value: item.location },
          ],
          bodyLines: item.highlights.slice(0, 5),
          tags: item.technologies,
        }),
      );
    });

    return frag;
  };

  const renderEducation = (): DocumentFragment => {
    const frag = document.createDocumentFragment();
    frag.append(
      sectionIntro(
        "education",
        `${educationData.length} entries (${completedEducation} completed / ${inProgressEducation} in progress / ${certificationCount} certs)`,
      ),
    );

    educationData.forEach((item) => {
      const links: CardLink[] = [];
      if (item.link) links.push({ label: "program", href: item.link });
      if (item.certificate) links.push({ label: "certificate", href: item.certificate.imagePath });

      frag.append(
        makeCard({
          title: item.title,
          subtitle: item.institution,
          status: item.status,
          metaPairs: [
            { label: "term", value: item.term },
            { label: "track", value: toKindLabel(item.kind) },
          ],
          bodyLines: [item.description],
          tags: item.skills,
          links,
        }),
      );
    });

    return frag;
  };

  return {
    renderProjects,
    renderExperience,
    renderEducation,
  };
};
