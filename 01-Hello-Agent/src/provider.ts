type Provider = "openai" | "gemini" | "groq";

type HelloOutput = {
  ok: true;
  provider: Provider;
  model: string;
  message: string;
};

type GeminiGenerateOutput = {
  candidates: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

async function helloGemini(): Promise<HelloOutput> {
  const apiKey = process.env.GOOGLE_GEMINI_KEY;
  if (!apiKey) throw new Error("Invalid Api Key");

  const model = "gemini - 2.0 - flash - lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      content: {
        parts: [
          {
            text: "Say a short hello",
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as GeminiGenerateOutput;
  const text =
    json.candidates?.[0]?.content?.parts?.[0].text ?? "Hello as default";

  return {
    ok,
    provider: "gemini",
    model: model,
    message: text,
  };
}
