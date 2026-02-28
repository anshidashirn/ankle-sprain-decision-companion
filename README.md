# Decision Companion System

A deterministic multi-criteria decision analysis (MCDA) framework. This system uses a **Transparent Weighted Sum Model (WSM)** to rank options based on user-defined parameters.

---

### Problem Statement
Real-world decisions often involve multiple competing criteria with different levels of importance. Humans tend to rely on intuition, which introduces bias and inconsistency. 

The goal of this system is to provide a **transparent, structured, and mathematically grounded framework** that helps users evaluate options objectively while still incorporating subjective priorities.

---

## Assumptions

- **Users can score consistently**  
  We assume users can rate each option on a simple fixed scale (2, 4, 6, 8, 10) in a way that reflects how they truly feel.
- **Criteria don’t overlap**  
  We assume each criterion measures something different (for example, “Salary” and “Work-Life Balance” are treated as separate and not double-counting the same thing).
- **Scores increase evenly**  
  We assume the difference between 6 and 8 is the same “improvement” as between 8 and 10. In other words, higher numbers always mean proportionally better outcomes.
- **Users are willing to prioritize**  
  We assume users are comfortable saying that one factor matters more than another.
- **All options are known**  
  We assume the user already knows the full set of options they want to compare. The system does not discover new options automatically.
---

## Structured Workflow

The system follows a clear and repeatable decision process:

1. **Define the Goal**  
   Clearly state what decision you are trying to make.
2. **Set Up the Structure**  
   - **Options**: List the choices you want to compare.  
   - **Criteria**: List the factors that matter for this decision.
3. **Initialize the Model**  
   The system prepares the calculation framework based on the options and criteria provided.
4. **Assign Importance**  
   - **Criteria Weights**: Indicate how important each factor is.  
5. **Fill the Decision Matrix**  
   Score how well each option performs against each criterion.
6. **Calculate and Rank**  
   The system normalizes all inputs, calculates weighted scores, ranks the options, and provides sensitivity insights.

---

## Data Model

The system operates on three core entities:

*   **Option**: `{ id: string, name: string, description: string }`
*   **Criterion**: `{ id: string, label: string, question: string, weights: { [optId: string]: number } }`
*   **DecisionMatrix**: A collection of normalized `Option` and `Criterion` weights used for calculation.

**Computational Complexity**  
The calculation runs in **O(n × m)** time, where:
- `n` = number of options  
- `m` = number of criteria  

---

## Visual Architecture & Design

To better understand the system's structure and data flow, please refer to the following design diagrams:

#### 1. System Architecture
![System Architecture](<./Design Diagrams/AFF.drawio.png>)
*High-level overview of the local-only, deterministic architecture.*

#### 2. Component Diagram
![Component Diagram](<./Design Diagrams/CDIA.drawio.png>)
*Visualizing the relationship between React components and the Logic Engine.*

#### 3. Data Flow Diagram (DFD)
![Data Flow Diagram](<./Design Diagrams/dfd2.drawio.png>)
*Tracing the journey of user input into weighted results.*

---

## Architectural Rationale (The "Why")

### 1. Why Weighted Sum Model (WSM)?

- **Weighted Sum Model (Chosen)**  
  I chose WSM because it is transparent, easy to explain, and aligns closely with how people naturally reason:  
  > “This factor matters this much, and this option performs this well.”

The decision to use WSM was not about choosing the most advanced model, but the most appropriate one for clarity, scalability, and explainability.

---

### 2. Normalization (Keeping the Math Fair)

To ensure results are balanced and not distorted by large numbers, the system normalizes all inputs before calculating the final score.

1. **Weight Normalization**

User-defined importance values are converted into proportions so that all weights sum to 1.

$$
\text{NormalizedWeight}_i = \frac{w_i}{\sum_{j=1}^{n} w_j}
$$

Where:

- $w_i$ = raw weight assigned to criterion $i$
- $n$ = total number of criteria

This ensures:

$$
\sum_{i=1}^{n} \text{NormalizedWeight}_i = 1
$$

So decisions are based on **relative importance**, not raw numbers.



2. **Score Scaling**

Performance scores are scaled to a 0–1 range to keep everything on the same scale:

$$
\text{NormalizedScore}_{ij} = \frac{r_{ij}}{10}
$$

Where:

- $r_{ij}$ = raw score of option $i$ on criterion $j$

This guarantees consistent comparison across all criteria.



3. **Final Calculation**

The final score for each option is calculated as:

$$
\text{FinalScore}_i = \sum_{j=1}^{m}
\left(
\text{NormalizedWeight}_j \times \text{NormalizedScore}_{ij}
\right)
$$

Where:

- $m$ = total number of criteria

The result is a value between **0 and 1**, representing how well the option aligns with the user's priorities.

This normalization process prevents:

- Score inflation  
- One criterion dominating unfairly  
- Scale inconsistencies

---

### 3. Handling Bias & Stability

Even structured systems depend on human input. To improve reliability, the system includes:

- **Sensitivity Analysis**  
  Shows how much a weight must change to affect the ranking.  
  If small changes flip results, the decision is sensitive.

- **Discrete Scoring Scale (2–10)**  
  Avoids a neutral middle value and encourages clearer evaluation.

---

### 4. Limitations & Intellectual Honesty

No decision model is perfect. This system makes simplifying assumptions to stay transparent and easy to use.
- **Linear Assumption**  
  The model assumes that higher scores always increase value at a constant rate. In reality, some factors (like salary) may have diminishing returns after a certain point.
- **Criteria Independence**  
  The system assumes each criterion measures something different. If criteria overlap, the model may unintentionally double-count similar factors.
- **Deterministic Model**  
  The system works with fixed inputs and produces fixed outputs. It does not account for uncertainty, risk, or probability in real-world outcomes.
  
---

### Complete Example

**Decision Goal**
Choosing between three job offers.

---

#### Step 1: Define Options

- **Option A** — Startup Company  
- **Option B** — Mid-size Company  
- **Option C** — Large Enterprise  

---

#### Step 2: Define Criteria & Weights

| Criterion            | Weight (2–10) |
|----------------------|---------------|
| Salary               | 10            |
| Work-Life Balance    | 6             |
| Growth Potential     | 8             |

Total Weight = 24

---

#### Step 3: Normalize Weights

$$
NormalizedWeight_i = \frac{w_i}{\sum w}
$$

| Criterion            | Raw Weight | Normalized |
|----------------------|------------|------------|
| Salary               | 10         | 0.42       |
| Work-Life Balance    | 6          | 0.25       |
| Growth Potential     | 8          | 0.33       |

(Sum = 1.0)

---

#### Step 4: Score Each Option (2–10 Scale)

| Option   | Salary | Work-Life | Growth |
|----------|--------|----------|--------|
| A        | 8      | 4        | 10     |
| B        | 7      | 8        | 7      |
| C        | 9      | 6        | 6      |

---

#### Step 5: Normalize Scores (Divide by 10)

| Option   | Salary | Work-Life | Growth |
|----------|--------|----------|--------|
| A        | 0.8    | 0.4      | 1.0    |
| B        | 0.7    | 0.8      | 0.7    |
| C        | 0.9    | 0.6      | 0.6    |

---

#### Step 6: Final Score Calculation

$$
FinalScore = \sum (NormalizedWeight \times NormalizedScore)
$$

##### Option A

\[
(0.42 × 0.8) + (0.25 × 0.4) + (0.33 × 1.0) = 0.77
\]

##### Option B

\[
(0.42 × 0.7) + (0.25 × 0.8) + (0.33 × 0.7) = 0.73
\]

##### Option C

\[
(0.42 × 0.9) + (0.25 × 0.6) + (0.33 × 0.6) = 0.73
\]

---

#### Final Ranking

1. **Option A** — 0.77  
2. **Option B** — 0.73  
3. **Option C** — 0.73  

---

#### Interpretation

- **Option A** ranks first because it performs extremely well on **Growth Potential**, which has high importance.
- **Option B** performs strongly on **Work-Life Balance**, but that criterion has lower overall weight.
- **Option C** benefits from high Salary, but weaker performance in Growth reduces its total.

---

#### Sensitivity Insight

If the weight of **Growth Potential** were reduced slightly (for example from 8 to 6), Option B would likely become the top recommendation.

This indicates the decision is somewhat sensitive to how much long-term growth is valued.
---

### Edge Cases Considered
*   **Equal Weighting**: If all criteria are given the same weight, the system automatically distributes importance evenly and avoids division errors.
*   **Tied Results**: If two options receive the same final score, the system compares their fractional contributions to show relative alignment.
*   **Extreme Weighting**: Normalization ensures that even large differences in weights (e.g., 10 vs 2) do not break the bounded [0,1] score range or distort calculations.

---

## Testing Strategy

The decision engine is designed to be easy to test.

Because it is:
- Deterministic (same input → same output)
- Based on pure functions
- Independent from React

This makes unit testing straightforward.

---

### What Should Be Tested

The following parts of the system can be tested independently:

- Weight normalization (weights should always sum to 1)
- Score normalization (scores should be scaled correctly)
- Final score calculation
- Ranking logic (higher score ranks first)
- Tie handling
- Sensitivity calculation
- Edge cases (zero weights, empty options, single criterion)

---

### Example Test Case

**Input:**
- 2 options
- 1 criterion
- Equal weights

**Expected Result:**
- The option with the higher score ranks first
- The normalized weights sum to 1

---

### How to Run Tests

If using Vitest:

```bash
npm install -D vitest
npm run test
```

---
## Future Improvements

With more time, the project could be improved in the following ways:

### Testing & Quality
- Add full automated unit test coverage  
- Add edge case stress testing  
- Set up Continuous Integration (CI) for automatic test runs  
- Track code coverage  

### Decision Model Enhancements
- Support cost-type criteria (where lower values are better)  
- Add alternative decision methods (e.g., AHP, TOPSIS)  
- Add basic uncertainty or risk modeling  

### User Experience
- Save decisions using localStorage or a backend  
- Export results to CSV or PDF  
- Add simple data visualizations (charts)  
- Compare multiple decision scenarios  

### Architecture Improvements
- Convert the engine into a reusable npm package  
- Add TypeScript for better type safety  
- Improve performance for larger datasets  

These improvements would make the system more robust, scalable, and production-ready.


### Getting Started
1. `npm install`
2. `npm run dev`
3. Access: `http://localhost:5173`

---

### Tech Stack

*   **Framework: React 19 + Vite 7**  
    I chose React because this project requires dynamic state updates (weights, matrix values, recalculations, sensitivity analysis) that benefit from a component-based architecture.  
    While a CLI or simpler HTML/JS approach would have worked, React makes the UI logic predictable and easier to scale if the system grows.  

    Vite was selected over heavier build tools because it provides fast iteration with minimal configuration. The goal was to keep tooling lightweight and focus on the decision engine itself.

*   **Logic Engine: Vanilla JavaScript (Deterministic MCDA)**  
    The core calculation engine is intentionally written in plain JavaScript instead of relying on external math libraries.  
    This keeps the logic transparent, easy to audit, and framework-independent.  
    Since the model is mathematically simple (O(n × m)), additional abstraction layers were unnecessary.

*   **Styling: Modern CSS (Glassmorphism)**  
    I avoided UI frameworks (e.g., Tailwind, Material UI) to reduce dependency overhead and maintain full control over layout and clarity.  
    The styling is intentionally minimal so that visual design does not distract from the structured decision process.
---

*Moving decision making from gut feeling to architectural clarity.*
