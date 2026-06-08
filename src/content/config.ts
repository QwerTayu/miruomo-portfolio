import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title:       z.string(),
    description: z.string(),
    tags:        z.array(z.string()),
    github:      z.string().url().nullable(),
    demo:        z.string().url().nullable(),
    period:      z.string(),          // "YYYY/MM" or "YYYY/MM~YYYY/MM"
    featured:    z.boolean().default(false),
    cover:       image().optional(),
  }),
});

export const collections = { works };
