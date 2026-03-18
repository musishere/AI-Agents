import { convert } from "html-to-text";
import { OpenUrlOutputSchema } from "./schema";
// browser tool and decide what content is safe and what we want model to show

export async function openUrl(url: string) {
  // 1. normalise url
  const normalizedUrl = validateUrl(url);

  // 2. fetch the pages
  const res = await fetch(normalizedUrl, {
    headers: {
      "User-agent": "agent-core/1.0 (+course-demo)",
    },
  });

  if (!res.ok) {
    const body = await safeText(res);
    throw new Error("Failed to get result of fetch");
  }

  // 3. check the content type
  const contentType = res.headers.get("content-type") ?? "";
  const raw = await res.text();

  // 4. conversion of text (html to readable text)
  const text = contentType.includes("text/html")
    ? convert(raw, {
        wordwrap: false,
        selectors: [
          {
            selector: "nav",
            format: "skip",
          },
          {
            selector: "header",
            format: "skip",
          },
          {
            selector: "footer",
            format: "skip",
          },
          {
            selector: "script",
            format: "skip",
          },
          {
            selector: "style",
            format: "skip",
          },
        ],
      })
    : raw;

  const cleaned = collapsedWhiteSpace(text);
  const capped = cleaned.slice(0, 8000);

  return OpenUrlOutputSchema.parse({
    url: normalizedUrl,
    content: capped,
  });
}

function validateUrl(url: string) {
  const parsed = new URL(url);

  // allow https
  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error("Only http/https allowed");
  }

  return parsed.toString();
}
async function safeText(res: Response) {
  try {
    await res.json();
  } catch (error) {
    return "<no body>";
  }
}

function collapsedWhiteSpace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
