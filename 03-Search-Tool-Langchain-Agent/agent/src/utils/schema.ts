import { z } from "zod";

export const webResultSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  snippet: z.string().default(""),
});

export const WebSearchResult = z.array(webResultSchema).max(10);
export type WebSearchResult = z.infer<typeof webResultSchema>;
