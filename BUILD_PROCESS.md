# Build Process & Architectural Evolution

This document traces the development of the Decision Companion System from a simple calculator to a mathematically rigorous MCDA engine.

### Phase 1: The Simple Sum (v1.0)
*   **Initial Build**: Basic linear sum $Score = \sum Performance$.
*   **Realization**: Without weights, all factors were treated as equally important, which is rarely true in human decision-making.
*   **Decision**: Introduced **Criterion Weights**.

### Phase 2: Multiplier Dominance (v1.2)
*   **Addition**: Added "Option Trust" as a raw multiplier.
*   **Problem**: Realized a high trust score could cause "Score Explosion," where an option wins solely on brand loyalty regardless of poor technical performance.
*   **Decision**: Switched to **Vector Normalization**.

### Phase 3: The Normalized Refactor (v1.5)
*   **Refactor**: All weights are now normalized to sum to 1.0. Intuition is treated as a balanced internal criterion.
*   **Benefit**: This removed scale-dependency and prevented any single factor from unbounded dominance.
*   **Documentation**: Removed the explicit equation display from the UI to focus on "Decision Quality" rather than math homework.

### Phase 4: Sensitivity & Explainability (v2.0 - Current)
*   **Optimization**: Realized users didn't understand *why* an option won.
*   **New Feature**: Added the **Explanation Engine** (Dominant Drivers & Contrarian Risk).
*   **Maturity Drop**: Added **Sensitivity Analysis**. The system now identifies "Pivot Factors"—the exact point where a user's preference would change the outcome.
*   **Tech Stack Evolution**: Moved from a simple CLI concept to a **React-based Matrix UI** because complex multi-criteria scoring is cognitively impossible to manage without a visual grid.

---
*Architectural Objective: Moving from "What is the answer?" to "Why is this the answer?"*
