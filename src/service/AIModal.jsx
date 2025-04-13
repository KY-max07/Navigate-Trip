const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY}`;

function extractJSON(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  return match ? match[1] : text;
}

export async function generateTravelPlan(prompt) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("No valid response from Gemini.");

    const cleaned = extractJSON(rawText);
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Error generating travel plan:", err);
    return { error: "Failed to generate travel plan." };
  }
}
