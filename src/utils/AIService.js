/**
 * AIService.js - Powered by Groq API (Llama 3.3 70B)
 * Groq provides 14,400 free requests/day with fast inference.
 * Get your free key at: https://console.groq.com
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export const analyzeGoal = async (goal) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey || apiKey === "your_groq_api_key_here") {
        throw new Error("GROQ_API_KEY_MISSING");
    }

    const prompt = `
        You are a world-class strategic decision analyst. Analyze this decision goal and generate a comprehensive factor list.
        
        GOAL: "${goal}"

        INSTRUCTIONS:
        1. Think deeply about every dimension of this decision:
           - Financial (cost, ROI, fees, resale, maintenance)
           - Functional (performance, specs, lifespan, reliability)
           - Social (status, community, family impact, networking)
           - Psychological (stress, satisfaction, confidence, peace of mind)
           - Risk (safety, volatility, legal, data privacy)
           - Contextual (location, availability, environment, convenience)
           - Long-term (future value, scalability, upgradability, exit)
        
        2. Identify exactly 8-13 HIGHLY SPECIFIC factors for this exact goal (no more, no less).
        3. Identify 5-6 REAL, SPECIFIC options (real brands/models/paths, not generic names).
        4. For each factor, score each option from 1.0 to 10.0 based on true expert knowledge.

        RETURN ONLY valid JSON (no markdown, no extra text):
        {
          "situations": [
            {
              "id": "s1",
              "label": "Factor Name",
              "question": "Simple 1-10 question",
              "weights": { "o1": 9.5, "o2": 4.0, "o3": 7.5, "o4": 8.0, "o5": 6.5 }
            }
          ],
          "options": [
            { "id": "o1", "name": "Real Product/Brand Name", "description": "Expert explanation in simple words." }
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
            temperature: 0.7,
            max_tokens: 4096,
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const err = await response.json();
        const msg = err?.error?.message || "Unknown Groq API error";
        throw new Error(`Groq API Error (${response.status}): ${msg}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from Groq API");

    const parsed = JSON.parse(text);
    const { situations, options } = parsed;

    if (!situations || !options || situations.length === 0) {
        throw new Error("Invalid data structure from AI");
    }

    // Auto-assign coefficients based on factor importance
    const processedSituations = situations.map(s => {
        const low = s.label.toLowerCase();
        const isHighPriority = low.includes('cost') || low.includes('budget') || low.includes('safety') || low.includes('critical');
        return { ...s, coefficient: isHighPriority ? 2.5 : 1.0 };
    });

    return { situations: processedSituations, options, mode: "AI" };
};
