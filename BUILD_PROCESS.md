# Build Process: Situational AI Decision Assistant

## Architecture

The system uses an AI-driven "Case Modeling" approach where decisions are broken down into specific situational scenarios.

### 1. AIService (`src/utils/AIService.js`)
- **Role**: Expert Knowledge Engine.
- **Logic**: Analyzes the user's goal to map it to one of **25+ specialized industries** (Tech, Science, Finance, etc.).
- **V11 Enhancement**: Removed all generic naming logic. The engine now returns **5-6 highly specific real-world recommendations** per goal (e.g., MacBook Pro M3 Max, Rivian R1S).
- **Dynamic Weighting**: Automatically scales situational weights based on the number of options and the nature of the factor (Quality vs. Value).

### 2. Decision Engine (`src/utils/DecisionEngine.js`)
- **Role**: Impact Weighting & Evaluation.
- **Scoring**: $Score = \frac{\sum (SituationImpact \times UserRelevance)}{\sum UserRelevance}$
- **Logic**: Every expert option is evaluated based on its specific impact in the situations the user identifies as relevant.

### 3. ChatBot UI (`src/components/ChatBot.jsx`)
- **Role**: Conversational Deep Search.
- **Flow**: Goal Input → **Deep Search Simulation (V10)** → Situational Analysis → Relevance Rating → **Expert Match Cards**.

## Implementation Details (v11)
- **High-Fidelity Realism**: Explicitly using real-world manufacturers and models for actionable results.
- **Industry scaling**: Expanded to 25+ categories with technical, expert-grade descriptions.
- **Dynamic Results UX**: UI scales to handle 5+ ranked recommendations with live match percentage.
