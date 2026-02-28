# BUILD_PROCESS.md

## How I Started

When I first read the assignment, I focused on building a structured decision system.  
My initial interpretation was that the system might need to help users clarify their decision context before evaluating it.

So I started with a very concrete implementation.

---

## Plan 1 — Fixed Criteria & Options (Domain-Specific)

In the beginning, the criteria and options were already defined inside the code.

I built a decision system for ankle sprain rehabilitation.

The options were fixed:
- Rest
- Home Exercise
- Physiotherapy
- Accelerated Sports Rehab

The criteria were also predefined:
- Recovery Speed
- Risk
- Cost
- Supervision Level
- Long-Term Stability

The only thing the user needed to do was adjust the weights based on their priorities.

The scoring logic was simple:

Final Score = Σ (weight × performance)

This version worked well.  
It was clear, mathematically structured, and easy to explain.

However, I realized something important:

The logic was reusable — but the topic was not.

The system demonstrated structured reasoning, but only within one domain.

That made me reconsider the scope.

---

## Plan 2 — Making It General Using AI

I then asked myself:

If the mathematical model works for ankle rehabilitation,  
why not make it work for any decision?

The only missing pieces were:

- Identifying relevant evaluation criteria for new topics  
- Identifying realistic options to compare  

So I introduced AI to handle those parts.

I integrated the Groq API using the Llama 3.3 (70B) language model to dynamically generate structured outputs.

### New Assumption

At this stage, I assumed users might not fully know:

- What criteria they should consider  
- What realistic options exist  

So the system now:

1. Takes a decision goal  
2. Sends the goal to the Llama 3.3 model via Groq API  
3. Uses AI to generate structured evaluation criteria  
4. Uses AI again to generate realistic and comparable options  
5. Applies the same weighted ranking logic  

The scoring formula remained:

Score(option) = Σ (weight × difference from ideal)

The AI was responsible only for discovery (criteria and options).  
The ranking engine remained deterministic and rule-based.

This made the system domain-agnostic and highly flexible.

However, a new observation emerged.

---

## The Turning Point

While this AI-driven version was powerful, I noticed something:

The more the system focused on discovering criteria and options,
the more it shifted toward AI-driven exploration rather than structured evaluation.

At that point, I revisited the assignment and reflected more carefully on its core objective.

The problem statement primarily emphasizes:

- Structuring decisions mathematically  
- Comparing known options  
- Applying transparent evaluation logic  

This clarified an important design insight:

The core value of the assignment was not goal discovery —  
it was disciplined decision structuring.

In Plan 2, I had assumed that users might not clearly know their criteria or available options. That assumption led me to design a discovery-heavy system.

That realization led me to refine the architecture.
I am comfortable revising architectural decisions when clearer requirements or insights emerge.

---

## Plan 3 (Final Plan) — Refocusing on Structured Logic

In the final version, I adjusted the system’s focus.

Instead of assuming the system must discover everything,
I assumed:

- The user knows the options they want to compare.
- The user knows what criteria matter to them.
- The main challenge is structuring those factors clearly.

So I simplified the architecture:

- Criteria are provided
- Options are provided
- The user controls weights
- The engine ranks transparently
- Weights are normalized
- No external multipliers
- An explanation layer shows why the result occurred

This shift made the system:

- More mathematically stable
- Less dependent on AI variability
- More aligned with the assignment’s objective
- Easier to reason about
- Easier to debug

The system became simpler — but stronger.

### Architectural Structure & Design Considerations

Although the project scope was controlled, I structured the system with clear logical separation:

- UI Layer  
  Handles user input (criteria, weights, options) and result visualization.

- Decision Engine Layer  
  Contains the deterministic scoring logic, weight normalization, and ranking algorithm.

- AI Integration Layer (Plan 2)  
  Isolated module responsible only for generating criteria and options via API calls.

Data flows in a single direction:
User Input → Processing → Scoring → Ranked Output.

Basic validation ensures:
- Weights are numeric
- No division-by-zero during normalization
- Scores remain within bounded ranges

---

## Alternative Approaches Considered


- Fully AI-Driven System  
  In Plan 2, the system relied heavily on AI to generate both criteria and options.  
  After testing it, I realized this reduced determinism and made the results dependent on model output quality.  
  I decided to shift the focus back to structured, mathematical logic.

- Multipliers (e.g., “Trust” Factor)  
  I experimented with adding multipliers to influence final scores.  
  This caused imbalance, where one strong factor could dominate the entire result.  
  I removed multipliers and kept all influence inside normalized weights.
---

## Mistakes & Corrections

### 1. Starting Too Narrow

I initially built a fully domain-specific system focused on ankle rehabilitation.

While the logic was clear and structured, the solution was too limited to one topic.

Correction:  
I expanded the system to support general decision-making instead of a single domain.

---

### 2. Expanding Scope Too Quickly

After generalizing the idea, I moved quickly toward AI-driven goal discovery.

This increased complexity before the core decision logic was fully stabilized.

Correction:  
I refocused on strengthening the mathematical foundation first.

---

### 3. Overusing AI

In Plan 2, AI was responsible for generating both criteria and options.

This reduced determinism and made the system dependent on model output quality.

Correction:  
I shifted the architecture so that the ranking engine remained fully deterministic, with AI playing a supporting role rather than a controlling one.

### 4. Multiplier Distortion

Using raw multipliers caused unstable scoring behavior.

Correction:  
All weights are normalized and treated uniformly inside the scoring model.

---

## What Changed During Development and Why

| Stage  | What Changed | Why |
|--------|-------------|------|
| Plan 1 | Fixed domain system | Establish core logic |
| Plan 2 | AI-generated criteria & options | Increase flexibility |
| Plan 3 | Known criteria & options + normalized MCDA | Improve clarity and alignment |

The biggest shift was not technical.

It was conceptual.

I moved from:

“Helping users discover what to consider”

to

“Helping users structure what they already want to evaluate.”

---

## Final Reflection

This project evolved because my understanding evolved.

At first, I prioritized flexibility.  
Then I explored intelligence.  
Finally, I prioritized clarity, structure, and alignment.

The final system is simpler than the AI-heavy version —  
but stronger in mathematical discipline and explainability.

That simplification was intentional.

The goal is not to build the most complex system possible.  
The goal is to build the most appropriate system for the problem.