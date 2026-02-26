/**
 * AIService.js - Modular Decision Assistant
 * Uses Groq API (Llama 3.3 70B) to fill missing parts of the decision framework.
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export const analyzeCase = async (goal, options = [], criteria = []) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey || apiKey === "your_groq_api_key_here") {
        throw new Error("GROQ_API_KEY_MISSING");
    }

    const prompt = `
        You are a world-class strategic decision analyst. Your task is to assist in defining the structure of a decision framework.

        CASE GOAL: "${goal}"
        USER OPTIONS: ${options.length > 0 ? options.join(', ') : 'None provided'}
        USER CRITERIA: ${criteria.join(', ')}

        INSTRUCTIONS:
        1. If OPTIONS are missing, suggest 4-5 REAL, SPECIFIC, and diverse options.
        2. STRICTLY USE ONLY the provided USER CRITERIA labels.
        3. For EACH criterion, provide a concise weighting question for the user.
        4. Focus on professional structural definitions.

        RETURN ONLY valid JSON:
        {
          "criteria": [
            { "id": "c1", "label": "Criterion Name", "question": "Brief weighting question (e.g. 'How important is cost?')" }
          ],
          "options": [
            { "id": "o1", "name": "Option Name", "description": "Expert summary." }
          ]
        }
    `;

    const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1, // Low temp for factual consistency
            max_tokens: 4000,
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Groq API Error: ${err?.error?.message || "Unknown"}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    // Return structural data only
    return {
        criteria: parsed.criteria.map(crit => ({ ...crit, weights: {} })),
        options: parsed.options
    };
};
