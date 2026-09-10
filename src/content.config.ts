import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({
    pattern: ["*/index.md", "*/index.en.md"],
    base: "./src/content/works",
    // "tercet-cam/index.md"    -> "tercet-cam"
    // "tercet-cam/index.en.md" -> "tercet-cam/en"
    generateId: ({ entry }) => {
      const match = entry.match(/^(.+)\/index(\.en)?\.md$/);
      if (!match) return entry;
      const [, folder, enSuffix] = match;
      return enSuffix ? `${folder}/en` : folder;
    },
  }),
  // index.md (ja) is canonical: it must set every field below.
  // index.en.md (en) only needs title/description + the markdown body —
  // the rest is always read from the ja entry, so they're optional here
  // purely to let the same schema validate both files.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      github: z.string().url().nullable().optional(),
      live: z.string().url().nullable().optional(),
      period: z.string().optional(),
      order: z.number().optional(),
      cover: image().optional(),
      status: z.enum(["hidden", "editing", "wip", "published"]).default("published"),
    }),
});

export const collections = { works };
