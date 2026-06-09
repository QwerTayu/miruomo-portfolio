import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      github: z.string().url().nullable(),
      live: z.string().url().nullable(),
      period: z.string(),
      order: z.number(),
      cover: image().optional(),
    }),
});

export const collections = { works };
