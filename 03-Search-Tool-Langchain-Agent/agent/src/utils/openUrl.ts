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
  }
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
