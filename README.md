# Decision Companion AI

An intelligent multi-criteria decision analysis tool that uses simulated AI logic to handle any decision goal.

## Features

- **Situational AI Analysis**: Describe your case (e.g., "Moving to a new city"), and the AI identifies specific scenarios relevant to you.
- **Scenario Impact Weighting**: Options are scored based on how well they handle each confirmed situation.
- **Dynamic Case Modeling**: Interactive questions help model your specific requirements in real-time.
- **Explainable Fit Score**: Transparent breakdown of how each option matches your situational profile.

## How it Works

1. **Describe Your Case**: Input your goal or current decision problem.
2. **AI Scenario Discovery**: The system brainstorms key "Situations" and "Options".
3. **Relevance Rating**: You rate how much each scenario applies to your specific case.
4. **Calculated Case Fit**: The engine calculates an optimal match using weighted situational impact.

## Technical Stack

- **Frontend**: React (Vite)
- **Logic**: Weighted Scoring Engine (MCDA)
- **Service**: Simulated LLM for dynamic criteria generation

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open your browser to `http://localhost:5173`
