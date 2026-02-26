# AI Decision Companion System

A smart, AI-powered decision assistant that helps you make big choices clearly and confidently. Just type your goal and answer a few simple questions — the app will do the rest.

---

### What does this do?

- **Understands your goal**: Type anything — *"Which car should I buy?"*, *"Should I move to a new city?"*, or *"Which laptop is best for me?"*
- **Real AI Factor Discovery**: Powered by **Groq (Llama 3.3 70B)**, the system autonomously discovers **8-13 expert-level situational factors** specific to your goal. No hardcoded data.
- **Your Priorities First**: Enter your own criteria (e.g., "Budget, Comfort") — they are placed first and never duplicated with AI factors.
- **Real-World Options**: The AI identifies **5-6 real products or paths** (e.g., Toyota Camry, Honda Civic, not generic placeholders).
- **Mathematical Ranking**: A linear equation is applied using the AI-calculated weights. Results are ranked by mathematical closeness to your ideal profile.
- **Simple to use**: All questions are in easy, plain English. No technical jargon.

---

### How to run it

1. Install dependencies: `npm install`
2. Create a `.env` file in the project root:
   ```
   VITE_GROQ_API_KEY=your_key_here
   ```
   Get a **free key** (14,400 req/day) at [console.groq.com](https://console.groq.com)
3. Start the app: `npm run dev`
4. Open `http://localhost:5173`

---

### How to use it

1. **Step 1** — Type your decision goal.
2. **Step 2** — Enter your personal priority factors (comma-separated).
3. **Step 3** — Review the AI-generated factor list (8-13 items, your factors listed first).
4. **Step 4** — Rate each factor's importance (1-10 scale).
5. **Step 5** — Read the ranked results with expert explanations.

---

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7 |
| AI Engine | Groq API (Llama 3.3 70B) |
| Decision Logic | Linear Scalar Equation (Distance-based ranking) |
| Styling | Vanilla CSS |

---

*Built as a Decision Companion System — designed to think like an expert advisor.*
