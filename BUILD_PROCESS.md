# Build Process: AI Decision Companion System

## Architecture

The system uses a **Generative AI Case Modeling** approach where a live LLM discovers and evaluates decision factors dynamically for any given goal.

---

### 1. AIService (`src/utils/AIService.js`)
- **Role**: Generative AI Factor Discovery Engine.
- **Provider**: [Groq API](https://console.groq.com) — Llama 3.3 70B (14,400 free req/day).
- **Logic**: Sends the user's goal to the Groq LLM with a structured prompt. The AI autonomously brainstorms and returns **8-13 highly specific situational factors** and **5-6 real-world expert options** in a guaranteed `json_object` format.
- **AI Scoring**: The LLM calculates performance weights (1.0–10.0) for each option against every factor, ensuring expert-level accuracy.
- **Deduplication**: User-defined factors are merged first and cross-checked so AI factors never repeat user-entered criteria.

### 2. Decision Engine (`src/utils/DecisionEngine.js`)
- **Role**: Linear Scalar Equation Evaluator.
- **Scoring**: `OptionScore = Σ (coefficient × weight)` per factor.
- **Ranking**: Computes `|UserScore − OptionScore|` to identify which option is mathematically closest to the user's ideal.

### 3. ChatBot UI (`src/components/ChatBot.jsx`)
- **Role**: Conversational AI Interface.
- **Flow**: Goal Input → Groq AI Analysis → Factor Review → Relevance Rating (1–10) → Ranked Expert Results.

---

## Setup

```bash
npm install
```

Create a `.env` file:
```
VITE_GROQ_API_KEY=your_key_here
```

Run:
```bash
npm run dev
```

---

## Implementation Notes (v18)

- **Generative AI**: All factors and options are discovered live — no hardcoded knowledge base.
- **Structured JSON Output**: Groq is instructed to return `json_object` format for reliable parsing.
- **Coefficient Logic**: Factors containing keywords like "cost", "budget", or "safety" are automatically assigned a higher coefficient (2.5×).
- **Clean UX**: Equation display removed. Factor list is clean and numbered. Results show match percentage and expert descriptions.
