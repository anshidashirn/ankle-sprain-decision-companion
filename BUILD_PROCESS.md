# Build Process: Situational AI Decision Assistant

## Architecture

The system uses an AI-driven "Case Modeling" approach where decisions are broken down into specific situational scenarios.

### 1. AIService (`src/utils/AIService.js`)
- **Role**: Scenario Discovery.
- **Logic**: Analyzes the user's goal to generate a list of "Situations" (contextual factors) and "Options" (potential choices).
- **Extension**: Currently simulated, but supports plug-and-play LLM integration.

### 2. Decision Engine (`src/utils/DecisionEngine.js`)
- **Role**: Impact Weighting.
- **Scoring**: $Score = \frac{\sum (SituationImpact \times UserRelevance)}{\sum UserRelevance}$
- **Logic**: Every option is evaluated based on its specific impact in the situations the user identifies as relevant.

### 3. ChatBot UI (`src/components/ChatBot.jsx`)
- **Role**: Conversational Modeling.
- **Flow**: Goal Input → Situational Analysis → Relevance Rating → Fit score visualization.

## Implementation Details (v2.1)
- **Situational Pivot**: Replaced abstract criteria with concrete scenario-based questions.
- **Impact Weights**: Options now have pre-calculated impact ratings for identified scenarios.
- **Fit Scores**: Results are displayed as a "Case Match" percentage/score.
