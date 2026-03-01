# RESEARCH_LOG.md

## 1. Purpose & Scope

This document records the research done while developing the decision-making system. It includes:

- All AI prompts used during development  
- Web searches performed  
- External ideas explored  
- Decisions on what was accepted, rejected, or modified  
- How the system evolved across Plan 1, Plan 2, and Plan 3  

The development process was **iterative and exploratory**, and this log captures that evolution.

---

## 2. Plan 1 — Domain-Specific Prototype (Ankle Rehabilitation)

### Research Focus

At this stage, the goal was to **validate a weighted scoring system** in a single domain (ankle rehabilitation).  
The focus was on **structured logic, clear scoring, and applying it to real rehabilitation exercises**, not generalization.

The main goal was to help patients or therapists **compare different rehabilitation options** for ankle sprains based on important criteria.

### Web Searches

- "How to implement weighted scoring model"  
- "Multi-criteria decision making methods"  
- "Explainable decision support systems"  
- "Ankle sprain rehabilitation exercises comparison"  
- "Factors affecting recovery from ankle sprain"  
- "existing medical recods of ankle sprain rehabilitation"
- "importants of proper ankle sprain rehab for athlets"

### AI Prompts Used 


1. “Create a simple decision system website for ankle sprain rehab. The options are Rest, Home Exercise, Physiotherapy, and Accelerated Sports Rehab. The criteria are Recovery Speed, Risk, Cost, Supervision Level, and Long-Term Stability. The website should let users enter numeric weights for each criterion and then show the options ranked based on these weights.”
2. “Improve the input form so it is easy to use, with clear numeric fields for weights and checkboxes or dropdowns for selecting the rehab options.”
3. “Design a results section that clearly displays the ranked options along with a short explanation of why each option scored that way, in simple language.”
4. “Explain step by step how to calculate a final weighted score for each rehab option using the criteria and weights”  
5. “Suggest ways to check that the user inputs are valid, like numeric weights and no missing options, and show simple error messages for the website.”  
6. “Suggest optional features that could make the website more helpful, like showing exercise images, progress tracking, or tips for preventing re-injury.”  


### What I Accepted

- Weighted Sum Model (Σ weight × performance)  
- Deterministic scoring instead of predictive models  
- Using a 1–10 scale for flexibility  
- Including **realistic rehab exercises and routines** for each option  
- Evaluation based on **Recovery Speed, Risk, Cost, Supervision Level, and Long-Term Stability**  

### What I Rejected

- Machine learning-based prediction models (not explainable enough)  
- Binary yes/no evaluation (too rigid)  


### Example Factors and Options

**Options:**

- **Rest** – Minimal activity, allows natural healing.  
- **Home Exercise** – Simple mobility and strengthening exercises done at home.  
- **Physiotherapy** – Supervised treatment with targeted exercises and manual therapy.  
- **Accelerated Sports Rehab** – Intensive program for athletes to return quickly to sport.  

**Criteria:**

- **Recovery Speed** – How quickly the ankle regains normal function.  
- **Risk** – Likelihood of re-injury or complications.  
- **Cost** – Financial cost to the patient.  
- **Supervision Level** – Amount of guidance required from professionals.  
- **Long-Term Stability** – Effectiveness in preventing future ankle problems.  

**Example Exercises (Home Exercise & Physiotherapy):**

- **Ankle Circles** – Improve mobility.  
- **Towel Scrunches** – Strengthen foot muscles.  
- **Heel Raises** – Improve calf and ankle strength.  
- **Resistance Band Work** – Strengthen ankle ligaments.  
- **Balance Exercises** – Improve stability and proprioception.  

---

## 3. Plan 2 — Making It General Using AI

### Research Focus

After validating the core logic in Plan 1, the goal was to **generalize the system** to handle any decision topic.  
The main idea was to **modify Plan 1** so AI could help suggest criteria and options dynamically, while keeping the deterministic ranking engine unchanged.


### AI Prompts Used (Plan 2 — Generalized System)

1. “I want to use the decision system we built for ankle sprain rehab for any topic. Use AI to suggest relevant criteria or factors that should be considered for this decision, explain why each factor is important, and provide examples in simple language so users can understand.”  
2. “Allow the user to add or adjust factors. Give extra weight to any factors that needs more weight, and ensure the system calculates scores using the weighted sum method (WSM).”  
3. “Search for realistic, real-world options for this decision. Include 5–6 practical examples for each category, and apply the WSM to each option using the criteria and weights. Rank the options based on the calculated scores.”  
4. “Explain clearly in simple language why each option received its ranking, so users understand the reasoning behind the results. Avoid generic sentences and show practical examples wherever possible.”  
5. “Simplify the user interface and input process. Make it easy for users to enter weights, add or modify factors, and see ranked results. ”  
6. “Check user inputs for errors, like non-numeric weights or missing options, and provide clear, simple error messages to prevent calculation issues.”


### Experimental Features During Plan 2

- **25+ industry knowledge base (hardcoded):** A set of predefined industry information to help AI suggest realistic options.  
- **20–25 factor exhaustive modeling:** Listing many factors per decision to ensure completeness of evaluation.  
- **Step-by-step AI reasoning enforcement:** Prompting AI to reason logically before suggesting factors or options.  
- **Linear equation auto-generation per case:** Automatically creating equations to calculate option scores using weights.  
- **Equation display in UI:** Showing the scoring equations on the interface for transparency.  
- **AI-calculated factor weights:** Letting AI suggest weights for criteria as a reference for users.  
- **Simulated “Deep Search” terminal-style UX:** A visual interface simulating detailed step-by-step exploration of options.  

### Bugs & Corrections

- "Career" was misinterpreted as "Car" → fixed using regex word-boundary matching.  
- Duplicate user-entered factors → implemented duplicate detection.  
- Too many factors reduced usability → limited list to 8–13 factors.  
- Equation display confused users → removed it from the UI for clarity.  

### What I Accepted

- Dynamic factor discovery via AI  
- User-defined criteria (comma-separated input)  
- Structured JSON outputs from AI  
- Clear separation between AI generation and deterministic ranking engine  

### What I Rejected

- Fully AI-driven scoring (kept deterministic engine)  
- 20–25 factor requirement (too heavy for user experience)  
- Hardcoded industry dataset  
- Raw multipliers causing dominance distortion  
- Overly complex explanation formats  

---

## 4. Plan 3 — Refocusing on Structured Logic (Final Plan)

### Research Focus

After experimenting with AI-driven discovery, I realized the assignment’s main goal is **structured evaluation of known options**.  
The system should **help users structure decisions mathematically and transparently**, not explore unknown goals.

### Adjustments Made

- Removed AI dependency from core ranking  
- Restored deterministic scoring as the central engine  
- Normalized weights to ensure bounded outputs  
- Removed external multipliers  
- Reduced complexity for clarity  

### AI Prompt Evolution (Final Phase)

1. “Remove AI-driven criteria and option discovery. The user will provide all criteria and options, and the system should use only these inputs for scoring. Also, remove the equation display from the UI.”
2. “Ask the user to enter weights for each criterion. Then calculate the scores for each option using these weights and rank the options accordingly.”
3. “Score each option using a simple scale, for example 2, 4, 6, 8, 10, so it is easy for the user to understand. Use a table for that with options and criterias in rows and colums”
4. “Do not use any external multipliers, like ‘Trust’ or intuition factors. All scoring should be based purely on user-provided weights.”
5. “Normalize all criterion weights so that the total adds up to 1. This ensures that each option’s score is proportional, consistent, and comparable across all options.”
6. “Show the final ranking and scores clearly, with accurate numeric values, and provide a simple explanation of why each option received its score.”



### What I Accepted

- Deterministic MCDA engine  
- Weight normalization for stability  
- Clear separation of layers (UI, Decision Engine, AI support)  
- Structured and explainable ranking logic  

### What I Rejected

- Full AI-driven criteria and option discovery for core logic  
- Any external multipliers (e.g., “Trust” factor)

### References & Influences

The following concepts influenced the system design:

- Weighted Sum Model (WSM) – a classical MCDA technique.
- Multi-Criteria Decision Analysis (MCDA) frameworks.
- Explainable Decision Support Systems principles.

Most concepts were validated through general research and AI-assisted exploration rather than formal academic sourcing.

---

## 5. Summary of Evolution

| Stage  | What Changed | Why |
|--------|-------------|------|
| Plan 1 | Fixed domain system | Establish core logic |
| Plan 2 | AI-generated criteria & options | Increase flexibility |
| Plan 3 | Known criteria & options + normalized MCDA | Improve clarity and alignment |

The biggest shift was **conceptual**:  
From: *“Helping users discover what to consider”*  
To: *“Helping users structure what they already want to evaluate”*

---

## 6. Reflection on Research Process

The research process was **iterative and experimental**.  

I explored:  

- Domain restriction  
- AI-driven generalization  
- Hybrid experiments (multipliers, discovery features)  

Key lessons:

- Deterministic structure provides stability  
- AI should assist, not dominate  
- Simplicity improves clarity  
- Alignment with assignment requirements is more important than adding extra features  

- **Prompts evolved over time:** I refined the AI prompts iteratively, starting with simple domain-specific prompts in Plan 1, then generalizing them in Plan 2, and finally focusing on clarity and deterministic logic in Plan 3. This shows how prompt design influenced system behavior and usability.
