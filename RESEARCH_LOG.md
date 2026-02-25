- [2026-02-23] **Pivot to Generalized AI Decision Companion**. Refactored logic to handle any decision by using simulated AI to discover criteria and options dynamically.
- [2026-02-23] **Situational Analysis Refactor**. Moved from abstract criteria to scenario-based modeling.
- [2026-02-23] **v10: High-Fidelity AI Specificity**. Expanded knowledge base to 25+ specialized industries with "Deep Search" simulation UI.
- [2026-02-23] **v11: Expert Precision & Variety**. Removed all generic naming (e.g., "Pro Elite"). Expanded every category to 5-6 highly specific real-world models (e.g., MacBook Pro M3 Max, Rivian R1S).
- [2026-02-24] **User-First Multi-Factor Flow**. Introduced the ability for users to define their own primary criteria via comma-separated input before the AI analysis runs.
- [2026-02-24] **v12: Ideal Match Linear Engine**. Replaced weighted sum with distance-based scalar matching. Implemented **Strict Linear Equations** and **Deep Semantic Selection** (Keyword Intent Extraction). Added word-boundary regex to prevent intent collisions (e.g., "Career" vs "Car").
- [2026-02-25] **v13: Real AI Transformation**. Removed the hardcoded 25+ industry knowledge base. Integrated **Google Gemini Pro (API)** to dynamically generate factors and options for ANY user goal. Implemented dynamic linear equation generation for every case.
- [2026-02-25] **v14: AI-Guided Weighting & Deep Thinking**. Enhanced Gemini prompt to force "Step-by-Step Thinking" on goal nuances. Refactored engine to let Gemini directly calculate option weights for each factor.
- [2026-02-25] **v15: Maximum Exhaustive Analysis**. Implemented "Comprehensive Monologue" instruction to force Gemini to brainstorm all hidden variables. Increased factor output to 15+ exhaustive situational criteria per goal for total completeness.
- [2026-02-25] **v16: Strategic Multi-Perspective Engine**. Upgraded to **Gemini 1.5 Pro** for superior reasoning. Implemented categorical brainstorming (Financial, Emotional, Social, Technical, Environmental, Risk, Long-term) to ensure an exhaustive set of factors.
- [2026-02-25] **v17: Hyper-Aggressive Factor Discovery**. Strictly enforced 20-25 exhaustive factors by requiring a minimum of 3 specific criteria per each of the 7 strategic domains. Focused on hidden expert-level variables.
- [2026-02-25] **v18: Groq/Llama 3.3 70B Migration**. Switched AI provider from Gemini (quota-limited) to **Groq API** (14,400 free req/day). Uses `response_format: json_object` for guaranteed structured output. Factor count refined to 8-13. UI updated to remove equation display. Duplicate user-factor detection added.

## AI Prompts Used
- "Generic MCDA (Multi-criteria decision analysis) in Javascript"
- "Situational assessment model for decision support systems"
- "How to weight impact factors by user relevance in scoring engines"

## Prompt History (Refinement Phase)

1. "actally i liked that how much you improved it, there are few things you need to change , 1. the qstn that you ask to the user is a little bit high standard, it should be in minimal terms. 2. it should identify all the factors and not only 4 factors. then the answer should telll the correct that the person needed, (the contnt in the answer should not be same, it have to be clear)"
2. "i would like to clear something, it should not explain about the decision it selected, it should say why should i choose that, and the situational reasoning not needed"
3. "i would like to make some changes: 1.whn you ask question to the user, there is no need to gtell the factor name in the question, just question needed. 2. i told you to simplify questions, but not need to make it small, it should be simple nut not too much small . 3. it is the most imporatnt thing, you should not tell about the question in the desicions, you have to explain the decisions, if you cant explain it, search with the help of ai, and explain every decisions"
4. "This is the strongest candidate for your specific case because it aligns perfectly with your most critical priorities. Choosing this path ensures that your major requirements are met with high stability and precision, offering a superior balance compared to other choices. this is the 2nd para in the answer, it is present in all the threea nswer, no need for this"
5. "there is few more changes i need to add, 1. the answer should be explained largly and every answer should tell in only simpler words, 2. the question that the chatbot ask should very simple, and every thing should be simply understandable english,3. update the reserach log and include every prompt that i gave to you"
6. "I want to remove all generic names like 'Laptop Pro Elite'. Every recommendation should be a real, expert-grade model (e.g., MacBook Pro M3, Razer Blade)."
7. "Expand every category to have at least 5-6 specific options so the user has more variety to choose from."
8. "The descriptions for these expert options should be very detailed and technically accurate, but still in simple English."
9. "i want to make a change, the factor that needed by the user should ask first, then only list the full factors including fctor from the user"
10. "i mean, the user can enter different factors, enter with comma, the factors added by the user should list line by line and then remaining factirs list"
11. "let me give my idea of the system, after generate the factors 1. Use Ai to generate a apted equation for that perticular case , 2. based on the value the user give through each 2-10 value, the it should calculate the value of the equation, 3. the important step is thi, collecting all the possible decisions, 4. calculate the value of the factors on the existing collected decisions, 5. analyse which value of the decisions closed to the value that got from user, 6. then show the result to user"
12. "there is 2 type of error iam seeing now, 1. when i enter my factor, the ai should understand it, it should include to the question, the question should be relevent and correct. 2. the decicions are not correct, i just give a simple example, when i enter malappuram place as my priority, i should list the houses from there based on the calculated equation, (note that the equation should linear, the equationj should prinnt so that better understanding will got, also note that the comparison of the decisions based on the equation generated by the ai)"
13. "just now i got an error, choosing a career got answer as chooosing a car, why is that, make sure that every AI working correctly"
14. "ok do that, bcz the 25+ datas are not the methord i wanted, you have to find the factors seperately"
15. "it only finding very few factors, it find all related factors"
16. "still the same error, the llm not working correctly. find a different way to the correct work of ai to get factors"
17. "it is working perfectly right now, a few changes i need to add, 1. the equation no need to show, 2. if my factor present in the AI fetched factor, do not repeat it"
18. "only 8-13 factors needed, it should be in between"

## What I Accepted
- Weighted sum model driven by case-specific "Situations".
- Dual-mapping (Situation -> Option Impact) for decentralized logic.
- **Expert-Grade Realism**: Explicitly using real-world manufacturers/models over generic labels.
- **Deep Search UX**: Simulated terminal logs to build trust in the "analysis" process.
- **User-Defined Criteria**: Support for comma-separated user inputs that override/complement the AI knowledge base.
- **Linear Scalar Engine**: Transitioning from relative scoring to absolute formula-based matching.
- **Intent Boundary Verification**: Using regex to ensure linguistic collision-free analysis (fixing "Career/Car" bug).
- **Dynamic Context Injection**: Injects specific real-world data (like Malappuram housing) when location keywords are detected.
- **Generative AI Foundation**: Fully dynamic factor and option discovery via AI API, removing limits of hardcoded datasets.
- **Groq/Llama Engine**: Switched to Groq (Llama 3.3 70B) for reliable, quota-free AI analysis.
- **Duplicate Factor Detection**: User-defined factors are intelligently merged with AI factors, skipping overlaps.
- **Clean UI**: Equation display removed. Factor list is simple, numbered, and clean.

## What I Rejected
- Binary yes/no situations (kept 1-10 scale for nuance).
- Global criteria (replaced with local scenarios per goal).
- Generic "Refinement" logic (e.g., appending 'Pro Elite' to strings—deleted for better realism).
