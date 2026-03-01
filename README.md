# Decision Companion System

A deterministic multi-criteria decision analysis (MCDA) framework. This system uses a **Transparent Weighted Sum Model (WSM)** to rank options based on user-defined parameters.

---

### Problem Statement
Real-world decisions often involve multiple competing criteria with different levels of importance. Humans tend to rely on intuition, which introduces bias and inconsistency. 

The goal of this system is to provide a **transparent, structured, and mathematically grounded framework** that helps users evaluate options objectively while still incorporating subjective priorities.

---

## Assumptions

- Users can score options consistently on a fixed scale (2–10).
- Each criterion measures a different factor (no overlap).
- Higher scores always mean proportionally better outcomes.
- Users can assign relative importance between criteria.
- All options are defined before evaluation.
---
## Structured Workflow

The system follows a simple decision process:

1. **Define the Goal** – State the decision clearly.
2. **List Options & Criteria** – Identify choices and evaluation factors.
3. **Assign Weights** – Set the importance of each criterion.
4. **Score Options** – Rate each option against each criterion.
5. **Calculate Results** – Normalize inputs, compute weighted scores, and rank options.
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

## Architectural Rationale 

### 1. Model Choice: Weighted Sum Model (WSM)

The system uses the **Weighted Sum Model (WSM)** because it is:

- Transparent
- Easy to explain
- Scalable
- Practical for real-world decisions

It aligns with natural reasoning:

> “This factor matters this much, and this option performs this well.”

The goal was clarity and explainability, not mathematical complexity.

---


### 2. Normalization Strategy

All inputs are normalized before final calculation to ensure fairness and consistency.

#### Weight Normalization

$$
NormalizedWeight_i = \frac{w_i}{\sum w}
$$

- Ensures all weights sum to 1  
- Preserves relative importance  

$$
\sum NormalizedWeight_i = 1
$$

---

#### Score Scaling

$$
NormalizedScore_{ij} = \frac{r_{ij}}{10}
$$

- Scales scores to a 0–1 range  
- Keeps all criteria comparable  

---

#### Final Score

$$
FinalScore_i = \sum (NormalizedWeight_j \times NormalizedScore_{ij})
$$

- Produces a value between 0 and 1  
- Prevents scale distortion and dominance bias  

---

### 3. Deterministic Core Design

The engine is intentionally deterministic and based on pure functions.

This ensures:
- Predictable outputs
- Easy reproducibility
- Straightforward debugging
- Simple unit testing

Determinism was prioritized over probabilistic modeling to maintain clarity and explainability.

---

## Limitations & Trade-Offs

- Assumes linear value growth (no diminishing returns).
- Assumes criteria independence.
- Deterministic outputs only (no uncertainty modeling).
- Compensatory model: a high score in one criterion can offset a low score in another.
- Does not model qualitative or fuzzy criteria directly.

These trade-offs prioritize transparency and simplicity.

---

## Example

### Decision Goal
Choose between two job offers.

---

### Step 1: Criteria & Weights

| Criterion         | Weight |
|------------------|--------|
| Salary           | 10     |
| Work-Life Balance| 5      |

Total Weight = 15

---

### Step 2: Normalize Weights

$$
NormalizedWeight_i = \frac{w_i}{\sum w}
$$

- Salary = 10 / 15 = 0.67  
- Work-Life = 5 / 15 = 0.33  

---

### Step 3: Score Options (2–10 Scale)

| Option | Salary | Work-Life |
|--------|--------|----------|
| A      | 8      | 4        |
| B      | 7      | 8        |

---

### Step 4: Normalize Scores

$$
NormalizedScore = \frac{RawScore}{10}
$$

| Option | Salary | Work-Life |
|--------|--------|----------|
| A      | 0.8    | 0.4      |
| B      | 0.7    | 0.8      |

---

### Step 5: Final Calculation

$$
FinalScore = \sum (NormalizedWeight \times NormalizedScore)
$$

- Option A = 0.67×0.8 + 0.33×0.4 = **0.67**
- Option B = 0.67×0.7 + 0.33×0.8 = **0.73**

---

### Final Ranking

1. **Option B**
2. **Option A**

---
## Testing Strategy

The decision engine is easy to test because it is:

- Deterministic (same input → same output)
- Built with pure functions
- Independent from the UI layer

This allows straightforward unit testing.

### Key Test Areas

- Weight normalization (sum must equal 1)
- Score normalization (correct scaling to 0–1)
- Final score calculation
- Ranking logic
- Tie handling
- Sensitivity calculation
- Edge cases (zero weights, empty inputs, single criterion)

### Edge Cases Considered

- Zero total weight (prevents division errors)
- Single option or single criterion
- Equal final scores (tie handling)
- Extreme weight differences
- Empty or missing inputs

### Example Test Scenario

**Input:**
- 2 options
- 1 criterion
- Equal weights

**Expected:**
- Higher score ranks first
- Normalized weights sum to 1

---

## Future Improvements

### Testing & Quality
- Full unit test coverage
- Edge-case stress testing
- Continuous Integration (CI)
- Code coverage tracking

### Decision Model
- Support cost-type criteria (lower is better)
- Add alternative methods (AHP, TOPSIS)
- Basic uncertainty modeling

### User Experience
- Save decisions (localStorage or backend)
- Export results (CSV/PDF)
- Add simple visualizations
- Compare multiple scenarios

### Architecture
- Publish engine as an npm package
- Add TypeScript
- Optimize for larger datasets

---

### How to Run the Project
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
