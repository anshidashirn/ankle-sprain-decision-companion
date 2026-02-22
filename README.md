# Ankle Sprain Rehabilitation Decision Companion

## Problem Understanding
This project implements a structured decision-support system that helps users evaluate rehabilitation strategies for ankle sprains. Recovery paths vary significantly based on personal conditions and priorities, creating a multi-criteria decision problem.

The goal is not to provide medical advice, but to help structure recovery-related trade-offs like cost vs. speed and pain management vs. risk.

## Core Features
### 🦶 Multi-Criteria Assessment
The system evaluates options based on 5 critical dimensions:
- **Pain Management**
- **Mobility Improvement**
- **Cost Efficiency**
- **Recovery Speed**
- **Risk Control**

### 🧠 Dynamic Weighted Scoring
- **Personalized Weights**: Criteria weights adjust automatically based on user priorities (Urgency, Budget, Risk Tolerance).
- **Safety Constraints**: Aggressive rehab paths are penalized if the user reports high pain or is in an early acute stage.
- **Explainable Reasoning**: Detailed explanations for why a specific path is recommended.

### ✨ Premium Experience
- Modern Dark UI with Glassmorphism.
- Interactive Decision Comparison Matrix.
- Phase-specific exercise recommendations.

## Design Philosophy
- **Deterministic Logic**: Every decision is traceable and mathematical (Weighted Sum Model).
- **Transparency**: Clear score breakdowns for every ranked option.
- **Explainability**: No "black-box" AI — reasoning is generated based on score contributions.

## How It Works
1. **Inputs**: User provides condition details (Pain, Swelling, Mobility) and priorities.
2. **Dynamic Weighting**: Weights are adjusted (e.g., High Urgency increases Recovery Speed weight by 40%).
3. **Scoring**: Final Score = Σ (Criterion Score × Adjusted Weight) - Constraints.
4. **Ranking**: Results are sorted and displayed in a comparison matrix.

## Disclaimer
This system is not a medical diagnostic or treatment tool. It is a structured decision-support framework intended to help users understand trade-offs in their recovery journey.
