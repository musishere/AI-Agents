// Search on internet tool

import { env } from "../shared/env";
import { webResultSchema, WebSearchResult } from "./schema";

export async function webSearch(query: string) {
  if (!query) return [];
  return await tavilyWebSearch(query);
}

async function tavilyWebSearch(query: string) {
  if (!env.TAVILY_API_KEY) {
    throw new Error("Missing api key");
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 5,
      include_answers: false,
      include_images: false,
    }),
  });

  if (!response.ok) {
    const text = await safeText(response);
  }

  const data = await response.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  const normalized = results.slice(0, 5).map((r: any) =>
    WebSearchResult.parse({
      title: r.title,
      url: r.url,
      snippet: r.snippet,
      source: r.source || "",
    }),
  );

  return WebSearchResult.parse(normalized);
}

async function safeText(res: Response) {
  try {
    await res.json();
  } catch (error) {
    return "<no body>";
  }
}
