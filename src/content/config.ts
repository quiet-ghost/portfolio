import { defineCollection, z } from "astro:content";

const profile = defineCollection({
  type: "data",
  schema: z.object({
    fullName: z.string(),
    headline: z.string(),
    location: z.string(),
    about: z.string(),
    email: z.string().email(),
    availability: z.object({
      status: z.enum(["open", "limited", "closed"]),
      label: z.string(),
      note: z.string(),
    }),
    resumePath: z.string(),
    avatar: z.string(),
    socials: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    ),
    focusAreas: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    summary: z.string(),
    status: z.enum(["active", "archived", "in-progress"]),
    technologies: z.array(z.string()),
    repository: z.string().url(),
    liveUrl: z.string().url().optional(),
  }),
});

const experience = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number().int(),
    type: z.enum(["work", "education"]),
    role: z.string(),
    organization: z.string(),
    location: z.string(),
    period: z.string(),
    highlights: z.array(z.string()),
    technologies: z.array(z.string()),
  }),
});

const education = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    institution: z.string(),
    term: z.string(),
    status: z.enum(["completed", "in-progress", "upcoming"]),
    kind: z.enum(["course", "certification"]),
    skills: z.array(z.string()),
    description: z.string(),
    link: z.string().url().optional(),
    hours: z.number().int().positive().optional(),
    certificate: z
      .object({
        title: z.string(),
        provider: z.string(),
        date: z.string(),
        imagePath: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  profile,
  projects,
  experience,
  education,
};
