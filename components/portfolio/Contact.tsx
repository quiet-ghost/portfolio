import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "./Section";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

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
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900/80 rounded-2xl shadow-xl shadow-cyan-500/10 border border-cyan-700/30 p-8 backdrop-blur"
      >
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Get in Touch</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-zinc-300 mb-1 font-medium">Name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800/80 border border-cyan-700/30 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-zinc-300 mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800/80 border border-cyan-700/30 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-zinc-300 mb-1 font-medium">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800/80 border border-cyan-700/30 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
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
          <p className="mt-4 text-green-400 font-medium text-center">Message sent! I will get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400 font-medium text-center">Something went wrong. Please try again later.</p>
        )}
      </motion.div>
    </Section>
  );
} 