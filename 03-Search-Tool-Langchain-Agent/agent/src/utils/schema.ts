import { z } from "zod";

export const webResultSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  snippet: z.string().default(""),
});

export const WebSearchResult = z.array(webResultSchema).max(10);
export type WebSearchResult = z.infer<typeof webResultSchema>;
export const OpenUrlInputSchmea = z.object({
  url: z.url(),
});

export const OpenUrlOutputSchema = z.object({
  url: z.url(),
  content: z.string().min(1),
});

export const SummarizeInputSchema = z.object({
  text: z.string().min(50, "Length should be 50(minimum)"),
});

export const SummarizeOutputSchema = z.object({
  summary: z.string().min(1),
});
