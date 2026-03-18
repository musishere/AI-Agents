import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getChatModel } from "../models";
import { SummarizeInputSchema, SummarizeOutputSchema } from "./schema";

export async function summarize(text: string) {
  const { text: raw } = SummarizeInputSchema.parse(text);

  const clipped = clip(raw, 4000);
  const model = getChatModel({ temperature: 0.2 });
  const messages = [
    new SystemMessage(
      "You are a helpful assistant that writes short and accurate summaries.\nGuidelines:\n- Be factual and neutral, avoid marketing",
    ),
    new HumanMessage(
      [
        "Summarize the following content for begginers",
        "Focus on key points and remove fluff",
        "TEXT:",
        clipped,
      ].join("\n\n"),
    ),
  ];
  const response = await model.invoke(messages);
  const rawModelOutput =
    typeof response.content === "string"
      ? response.content
      : String(response.content);

  const summary = normalizedSummary(rawModelOutput);
  return SummarizeOutputSchema.parse({ summary });
}

function clip(s: string, max: number) {
  return s.length > max ? s.slice(0, max) : s;
}

function normalizedSummary(s: string) {
  // Remove extra whitespace, newlines, and leading/trailing spaces
  return s
    .replace(/\s+/g, ' ') // collapse whitespace
    .replace(/^\s+|\s+$/g, '') // trim
    .replace(/\n/g, ''); // remove newlines
}
