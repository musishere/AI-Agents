import { z } from "zod";

export const askResultsSchema = z.object({
  summary: z.string().min(1).max(1000),
  confidence: z.number().min(0).max(1),
});

export type askResult = z.infer<typeof askResultsSchema>;
