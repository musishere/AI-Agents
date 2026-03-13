import { createChatModel } from "./lcModel";
import { askResult, askResultsSchema } from "./schema";

export async function askStructured(query: string): Promise<askResult> {
  // 1. get the available model
  const { model } = createChatModel();

  // 2. write system prompts and user query
  const system = "You are a concise assistant. Return only the requested JSON";
  const user =
    `Summarize for a beginner:\n` +
    `"${query}\n` +
    `Returned fields: summary (short pargraph) confidence(0..1)`;

  // 3. send structured schema
  const structured = model.withStructuredOutput(askResultsSchema);
  const result = await structured.invoke([
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
  ]);

  return result;
}
