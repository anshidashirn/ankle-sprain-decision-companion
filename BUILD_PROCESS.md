# Build Process

## 🛠️ Evolution of the System

1.  **Architecture**: I chose a utility-first approach by separating the decision logic into `DecisionEngine.js`. This ensures the mathematical model is pure and testable independent of the React UI.
2.  **Logic Enhancement**: The pivot from a standard weighted sum to a **Context-Aware Weighted Sum** was crucial. By implementing sprain grades (I, II, III), the system can now apply dynamic multipliers to the base scores, making it much more accurate for clinical decision-making.
3.  **UI/UX Design**: Adopted a "Glassmorphism" aesthetic using semi-transparent backgrounds and backdrop-filters. This creates a modern, trustworthy feel appropriate for a health-focused decision tool.

## 🔄 Refactoring Decisions

- **Vendor Prefixes**: Standardized `background-clip` and `backdrop-filter` for full cross-browser compatibility.
- **Dynamic Advice**: Refactored the engine to return not just scores, but personalized strings based on the user's injury location and severity.

## 🧪 Verification Steps

- Verified that Grade III sprains correctly flag the "Surgical Repair" option as a high-value (multiplier-boosted) path while warning against "Home Rehab."
- Confirmed that the responsive grid layout handles both mobile and desktop viewports effectively.
