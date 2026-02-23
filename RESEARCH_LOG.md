## Key Events
- [2026-02-23] **Pivot to Generalized AI Decision Companion**. Refactored logic to handle any decision by using simulated AI to discover criteria and options dynamically.
- [2026-02-23] **Situational Analysis Refactor**. Moved from abstract criteria to scenario-based modeling. Implemented "Situation-Impact" logic to ensure decisions are taken purely based on the specific case scenarios identified.

## AI Prompts Used
- "Generic MCDA (Multi-criteria decision analysis) in Javascript"
- "Situational assessment model for decision support systems"
- "How to weight impact factors by user relevance in scoring engines"

## What I Accepted
- Weighted sum model driven by case-specific "Situations".
- Dual-mapping (Situation -> Option Impact) for decentralized logic.

## What I Rejected
- Binary yes/no situations (kept 1-10 scale for nuance).
- Global criteria (replaced with local scenarios per goal).

