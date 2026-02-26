# AI Decision Companion System

A smart AI-powered assistant that helps users think through important decisions in a structured and logical way.

Instead of just giving a suggestion, this system:
- Understands your goal
- Discovers relevant evaluation factors using AI
- Lets you control what matters most
- Ranks real-world options mathematically

The goal is not to replace your judgment — but to structure it.

---

## 1. My Understanding of the Problem

Making big decisions is hard because:

- People don’t always know what factors they should consider.
- Important criteria are often forgotten.
- Comparing multiple options objectively is difficult.
- Decisions are influenced by bias and emotion.

Most tools either:
- Provide static comparison tables, or  
- Give AI recommendations without transparency.

I wanted to build something that:
1. Uses AI to discover expert-level evaluation factors.
2. Keeps the user in control of priorities.
3. Applies a transparent mathematical ranking method.
4. Produces explainable results.

This project acts more like a structured decision companion than a recommendation engine.

---

## 2. Assumptions Made

- Users can describe their decision goal clearly in text.
- Users can provide at least one personal priority.
- A 1–10 importance scale is intuitive enough.
- LLM-generated factors are contextually accurate.
- Linear distance-based ranking is sufficient for an MVP.
- Users prefer explainable logic over black-box AI decisions.

---

## 3. Why I Structured the Solution This Way

I divided the system into three logical parts:

### 1. User Input Layer
- Decision goal
- Personal priority factors
- Importance weights

This keeps the user in control from the start.

### 2. AI Intelligence Layer (Groq + Llama 3.3 70B)
The AI:
- Discovers 8–13 relevant decision factors
- Places user priorities first
- Avoids duplication
- Identifies 5–6 real-world options

I chose dynamic AI factor discovery instead of hardcoding categories to keep the system domain-agnostic.

### 3. Decision Engine
A linear scalar distance formula ranks options based on:
- AI-evaluated performance
- User-defined weights
- Closeness to an ideal profile

This keeps the ranking:
- Transparent
- Deterministic
- Easy to reason about

---

## 4. Design Decisions & Trade-offs

### Dynamic AI Factors vs Hardcoded Logic
**Why:** Makes the system flexible for any decision type.  
**Trade-off:** Relies on model consistency.

---

### Linear Ranking vs Advanced ML Models
**Why:**  
- Explainable  
- Easy to debug  
- Predictable  

**Trade-off:**  
- Doesn’t capture nonlinear trade-offs  
- Less sophisticated than AHP/TOPSIS  

---

### Frontend-Only Architecture (for now)
**Why:** Faster development and easier deployment.

**Trade-off:**  
- API key is stored in `.env`
- Not production-secure yet

---

### Plain English UI
Designed for non-technical users.  
No jargon. No technical complexity in the UX.

---

## 5. Edge Cases Considered

- Duplicate factors between user input and AI output
- Empty goal submission
- User provides no priorities
- All weights equal
- Extremely vague goals
- AI generating fictional options
- API failure or invalid key
- AI returning fewer than expected factors
- Very niche or technical decisions

---

## 6. How the Ranking Works

Each option is evaluated across all factors.

We compute:

```
Score(option) = Σ (weight_i × |ideal_i − option_i|)
```

Lower score = closer to the user's ideal profile.

This ensures:
- User-controlled weighting
- Mathematical transparency
- Consistent output

---

## 7. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 |
| Build Tool | Vite 7 |
| AI Engine | Groq API (Llama 3.3 70B) |
| Decision Logic | Linear Distance-Based Ranking |
| Styling | Vanilla CSS |

---

## 8. How to Run the Project

### 1. Clone the repository

```bash
git clone <your_repo_url>
cd <project_folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory

```
VITE_GROQ_API_KEY=your_key_here
```

You can get a free API key from:
https://console.groq.com

---

### 4. Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 9. How to Use the App

1. Enter your decision goal.
2. Enter your personal priority factors (comma-separated).
3. Review AI-generated factors (your factors appear first).
4. Rate each factor (1–10 importance scale).
5. Review the ranked options and explanations.

---

## 10. What I Would Improve With More Time

If I continued working on this project, I would:

- Move API logic to a backend for security.
- Add AHP or TOPSIS ranking methods.
- Add radar charts for visual comparison.
- Implement decision history & saved sessions.
- Add AI confidence scoring.
- Improve hallucination detection.
- Add export to PDF.
- Add dark mode and UI polish.
- Add multi-model validation (cross-checking LLM outputs).

---

## 11. Final Thoughts

This project demonstrates:

- AI integration with structured logic
- Human-centered system design
- Explainable ranking systems
- Clear separation between reasoning and computation

It’s not just a recommendation app — it’s a structured thinking tool powered by AI.
