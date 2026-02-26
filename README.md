# Decision Companion System v2.0

A high-performance, structured decision-making framework that combines human intuition with mathematical rigor. Unlike "black-box" AI tools, this system uses a **Transparent Multi-Criteria Decision Analysis (MCDA)** model to rank your options based on your specific priorities.

---

### 🛡️ Structured Workflow

The system enforces a disciplined decision architecture to ensure maturity and clarity:

1.  **Goal Definition**: Clearly state what you are deciding (e.g., "Choosing a new career path").
2.  **Structural Setup**:
    -   **Options**: Define your choices (e.g., "Software Engineering, Data Science"). AI can suggest missing options.
    -   **Criteria**: Strictly define the factors that matter to you (e.g., "Salary, Work-Life Balance").
3.  **Dual-Weighting Phase**:
    -   **Criteria Weights**: Rate the importance of each criterion (2, 4, 6, 8, or 10).
    -   **Option Weights**: Rate your baseline trust or preference for each option (2, 4, 6, 8, or 10).
4.  **Interactive Decision Matrix**: You manually input performance scores (**2, 4, 6, 8, or 10**) for every Option vs Criterion combination in the table.
5.  **Mathematical Evaluation**: The engine applies the **Dual-Weighted Sum Model** to calculate fractional match percentages and ranked results.

---

### ⚛️ Mathematical Model

The system uses a refined **Weighted Sum Model (WSM)**:

$$FinalScore = OptionWeight \times \sum (CritWeight \times PerformanceScore)$$

This ensures that your professional intuition (Option Weight) is numerically integrated with objective factor analysis (Criteria Performance).

---

### 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Configure Environment**:
    Create a `.env` file in the root:
    ```env
    VITE_GROQ_API_KEY=your_groq_api_key_here
    ```
    *Get your key at [console.groq.com](https://console.groq.com)*
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **Access App**: Open `http://localhost:5173`

---

### 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **UI Framework** | React 19 + Vite 7 |
| **Logic Engine** | Vanilla JavaScript (MCDA / WSM) |
| **Styling** | Modern CSS (Glassmorphism & Gradients) |
| **AI Layer** | Groq API (Structural support only) |

---

*Moving decision making from gut feeling to architectural clarity.*
