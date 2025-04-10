const API_URL = "http://localhost:3000/api/ai";

export const getAIExplanation = async function* (prompt: string) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (!response.body) {
      throw new Error("ReadableStream not available in response");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is not readable");
    }
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        while (true) {
          const lineEnd = buffer.indexOf("\n");
          if (lineEnd === -1) break;

          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              yield "[DONE]";
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      }
    } finally {
      reader.cancel();
    }
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    throw error;
  }
};

export default getAIExplanation;
