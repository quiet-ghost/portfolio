import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      // Parse response body
      const data = await res.json();
      
      // Log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log("Contact API Response:", { status: res.status, data });
      }
      
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Contact form failed:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" variant="card" className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 },
          y: { duration: 0.8 },
        }}
        style={{ willChange: "transform, opacity" }}
      >
        <h2
          className={`text-4xl font-bold mb-8 text-center ${
            isDark ? "text-cyan-400" : "text-cyan-600"
          }`}
        >
          Get in Touch
        </h2>{" "}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className={`block mb-1 font-medium ${
                isDark ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-700/30 text-zinc-100"
                  : "bg-white/80 border-zinc-300 text-zinc-900"
              }`}
            />{" "}
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block mb-1 font-medium ${
                isDark ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-700/30 text-zinc-100"
                  : "bg-white/80 border-zinc-300 text-zinc-900"
              }`}
            />{" "}
          </div>
          <div>
            <label
              htmlFor="message"
              className={`block mb-1 font-medium ${
                isDark ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-700/30 text-zinc-100"
                  : "bg-white/80 border-zinc-300 text-zinc-900"
              }`}
            />{" "}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-500/80 text-zinc-900 font-bold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-green-400 font-medium text-center">
            Message sent! I will get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400 font-medium text-center">
            Something went wrong. Please try again or email me directly at{" "}
            <a 
              href="mailto:ksclafani@quietghost.dev" 
              className="underline hover:text-red-300"
            >
              ksclafani@quietghost.dev
            </a>
          </p>
        )}
      </motion.div>
    </Section>
  );
}
