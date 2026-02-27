# Decision Companion System v2.0

A deterministic multi-criteria decision analysis (MCDA) framework. This system uses a **Transparent Weighted Sum Model (WSM)** to rank options based on user-defined parameters.

---

### 📝 Problem Statement
Real-world decisions often involve multiple competing criteria with different levels of importance. Humans tend to rely on intuition, which introduces bias and inconsistency. 

The goal of this system is to provide a **transparent, structured, and mathematically grounded framework** that helps users evaluate options objectively while still incorporating subjective priorities.

---

### 📋 Assumptions
*   **Cardinal Scoring**: Users can meaningfully score options on a fixed discrete scale (2, 4, 6, 8, 10).
*   **Independence of Irrelevant Alternatives (IIA)**: Criteria are assumed to be independent (no overlap).
*   **Linear Utility**: Utility is assumed to be linear within the scoring range.
*   **Explicit Trade-offs**: Users are willing to make explicit trade-offs between competing factors.
*   **Finite Option Set**: All options are known upfront (no dynamic discovery).

---

### 🛡️ Structured Workflow
The system enforces a reproducible decision architecture:

1.  **Goal Definition**: Clearly state the analysis target.
2.  **Structural Setup**:
    -   **Options**: Define the set of candidates.
    -   **Criteria**: Define the independent factors for evaluation.
3.  **Framework Initialization**: The system initializes the mathematical model tailored to the specific variables.
4.  **Dual-Weighting Phase**:
    -   **Criteria Weights**: Assign importance to each criterion.
    -   **Intuition Weight**: Assign a baseline preference (Initial Trust) to each option. This is treated as a **Normalized Intuition Criterion** within the model to ensure mathematical consistency.
5.  **Interactive Decision Matrix**: Manual input of performance scores for the Option-Criterion matrix.
6.  **Mathematical Evaluation**: The engine applies vector-normalized calculation and produces ranked results with sensitivity analysis.

---

### 💾 Data Model
The system operates on three core entities:

*   **Option**: `{ id: string, name: string, description: string }`
*   **Criterion**: `{ id: string, label: string, question: string, weights: { [optId: string]: number } }`
*   **DecisionMatrix**: A collection of normalized `Option` and `Criterion` weights used for calculation.

**Computational Complexity**: $O(n \times m)$ where $n = \text{Options}$ and $m = \text{Criteria}$.

---

### 🧠 Architectural Rationale (The "Why")

#### 1. Why Weighted Sum Model (WSM)?
We explicitly evaluated three primary MCDA frameworks before selection:
*   **AHP (Analytic Hierarchy Process)**: Rejected due to **Pairwise Complexity**. Requiring $n(n-1)/2$ comparisons for every criterion and option creates massive cognitive overhead.
*   **TOPSIS**: Rejected due to **Interpretability Gap**. While mathematically elegant, "Distance from the ideal" is difficult for a human user to intuitively verify.
*   **WSM (Chosen)**: Selected for its **Scalability and Transparency**. It maps directly to deterministic logic: importance multiplied by performance.

#### 2. Mathematical Rigor: Vector Normalization
To prevent score inflation and weight dominance, we implement a multi-stage normalization pipeline:

1.  **Weight Normalization**: User weights $w_i \in [2,10]$ are converted into a probability vector:
    $$NormalizedW_i = \frac{w_i}{\sum_{j=1}^{n} w_j}$$
    *This ensures $\sum NormalizedW = 1.0$.*

2.  **Score Scaling**: Raw scores $r_{ij} \in [2,10]$ are scaled to a deterministic [0,1] range:
    $$NormalizedR_{ij} = \frac{r_{ij}}{10}$$

3.  **Final Evaluation**:
    $$FinalScore = \sum (NormalizedW \times NormalizedR)$$

#### 3. Handling Human Ambiguity & Bias
*   **Sensitivity Analysis Engine**: The system identifies **Rank-Flip Triggers**—calculating the exact delta required to swap the Top 2 recommendations. This surfaces subconscious biases in weighting.
*   **Discrete Scaling**: Using an even scale (2,4,6,8,10) eliminates "Middle Bias" (the neutral 5), forcing definitive judgments.

#### 4. Limitations & Intellectual Honesty
*   **Linear Assumption**: Does not account for diminishing returns curve.
*   **Independence**: Susceptible to double-counting if criteria overlap.
*   **Deterministic**: Does not utilize probabilistic uncertainty modeling.

---

### 🔦 Example Output
1. **Option A** — 0.78
2. **Option B** — 0.64
3. **Option C** — 0.52

**Executive Reasoning:**
- **Primary Driver**: Salary (34% contribution to final score).
- **Secondary Factor**: Growth Potential (28% contribution).

**Sensitivity Insight**: If "Salary" weight were reduced by 12%, **Option B** would flip to rank #1.

---

### ⚠️ Edge Cases Considered
*   **Equal Weighting**: Prevents division by zero; defaults to equal distribution.
*   **Tied Results**: Handled via relative fractional match percentages.
*   **Extreme Weighting**: Vector normalization ensures a weight of 10 vs 2 doesn't "break" the bounded [0,1] score range.

---

### 🚀 Getting Started
1. `npm install`
2. `npm run dev`
3. Access: `http://localhost:5173`

---

### 🛠️ Tech Stack
*   **Framework**: React 19 + Vite 7
*   **Logic Engine**: Vanilla JavaScript (Deterministic MCDA)
*   **Styling**: Modern CSS (Glassmorphism)

---

*Moving decision making from gut feeling to architectural clarity.*
