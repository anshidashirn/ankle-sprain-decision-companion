# Build Process

## Initial Understanding of the Problem
 I understood that the goal is to design a structured decision-support system. The emphasis was clearly on how I think, I have two choices:
 - A general decision companion system that could handle any topic
 - A specific decision companion system that explores one topic deeply and provides well-structured recommendations
 
## Why I Chose a Specific Domain Instead of a Fully General System
Since the assignment focuses on clear and logical decision-making, I decided to work on one specific use case. If I had built a completely general system, it would have been harder to clearly define how each criterion should work in different situations.
By focusing on a single domain, I was able to:
- Make clear and realistic assumptions
- Keep the scoring logic simple and easy to explain
- Understand the trade-offs better
- Avoid adding unnecessary complexity
This helped me focus more on depth and clarity instead of trying to cover everything at once.

## Topic Selection
Two months prior to starting this project, I experienced an ankle sprain and had to take rest for nearly two months. During my recovery period, I spent time researching ankle sprains in detail to better understand the injury, its stages, and the recommended rehabilitation approaches.
During this time, I realized that recovery is not the same for everyone. Each stage of an ankle sprain needs different exercises and activity levels. Things like pain level, movement restriction, and how quickly someone wants to return to normal activity all affect the recovery plan.
This personal experience made me realize that rehabilitation decisions involve multiple trade-offs and structured reasoning. That insight inspired me to design a decision companion system focused on ankle sprain rehabilitation, where different recovery strategies can be evaluated based on individual conditions and priorities.

## Implementation Details (Enhanced Logic)

### 1. Data Structure Refinement
I expanded the criteria from basic recovery metrics to include **Risk Control** and **Cost Efficiency**. I also defined four distinct rehabilitation options:
- **Rest-Focused**: Safe but slow.
- **Home Exercise**: Balanced and affordable.
- **Physiotherapy-Guided**: Most effective but higher cost.
- **Accelerated Sports**: Fastest but carries higher risk.

### 2. Weighted Scoring Mechanism
I implemented a **Weighted Sum Model** where user inputs like "Urgency" and "Budget" dynamically shift the emphasis of the scoring:
- If `Urgency` is **High**, `Recovery Speed` weight is increased.
- If `Budget` is **Low**, `Cost Efficiency` weight is prioritized.

### 3. Constraint & Safety Logic
To make the system more realistic, I added logic to penalize "Accelerated Sports Rehab" if the user has high pain levels (>8/10) or is in the initial 3 days of injury (Acute Phase). This ensures the "best match" is not just the fastest, but the safest for their current state.

### 4. UI Transformation
I redesigned the interface using a premium dark theme.
- **Color Palette**: HSL Tailored (Vibrant Orange accent on Deep Charcoal).
- **Glassmorphism**: Cards use `backdrop-filter: blur(20px)` for a modern, depth-focused look.
- **Visual Matrix**: Instead of a simple list, I built a structured comparison matrix showing score breakdowns and "Why this option?" reasoning.

## Final Decision Engine Logic
```javascript
Final Score = Σ (Base Score * Adjusted Weight) - Safety Penalties
```
The system is now fully traceble, ensuring users can see exactly why one option ranks higher than another based on their specific priorities.
