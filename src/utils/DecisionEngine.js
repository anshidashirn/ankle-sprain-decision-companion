/**
 * Structured Decision Engine (MCDA - Weighted Sum Model)
 * 1. Score = Σ (Value_opt,crit * Weight_user,crit)
 * 2. Normalization to 100%
 * 3. Narrative Explanation Generation
 */

export const evaluateOptions = (options, criteria, criteriaImportance) => {
    // 1. Prepare Weights & Normalize (Scaling sum to 1.0)
    const weightMap = {};
    let totalRawWeight = 0;

    // Weight of specific criteria
    criteria.forEach(c => {
        const val = parseFloat(criteriaImportance[c.id] || 5);
        weightMap[c.id] = val;
        totalRawWeight += val;
    });

    // Final Normalization: Vector of weights w where Σw = 1
    const normalizedWeights = {};
    Object.keys(weightMap).forEach(id => {
        normalizedWeights[id] = weightMap[id] / totalRawWeight;
    });

    // 2. Evaluate Options (Scaled 0.0 - 1.0)
    const evaluated = options.map(option => {
        let weightedSum = 0;
        const breakdown = [];

        // Criteria Performance
        criteria.forEach(crit => {
            const performance = (crit.weights[option.id] || 0) / 10; // Scale 1-10 to 0-1
            const weight = normalizedWeights[crit.id];
            const contribution = weight * performance;

            weightedSum += contribution;
            breakdown.push({
                id: crit.id,
                name: crit.label,
                weight: weight.toFixed(3),
                performance: performance.toFixed(2),
                contribution: contribution
            });
        });

        return {
            ...option,
            score: weightedSum, // Range [0, 1]
            matchPercentage: (weightedSum * 100).toFixed(1),
            breakdown: breakdown.sort((a, b) => b.contribution - a.contribution)
        };
    });

    // 3. Rank and Generate Explainability
    const ranked = evaluated.sort((a, b) => b.score - a.score);

    // 4. Sensitivity Analysis (Rank-Flip Trigger Detection)
    // Find how much a weight needs to change to swap #1 and #2
    const sensitivity = { pivotFound: false, factor: null, requiredDelta: null };
    if (ranked.length >= 2) {
        const first = ranked[0];
        const second = ranked[1];
        const scoreGap = first.score - second.score;

        // For each factor, calculate delta weight required to swap positions
        const potentialPivots = first.breakdown.map(f1 => {
            const f2 = second.breakdown.find(b => b.id === f1.id);
            const perfDiff = f2.performance - f1.performance; // Positive if second choice is better at this

            if (perfDiff > 0.1) { // Only factors where the runner-up is actually better
                // deltaW * perfDiff = scoreGap
                const neededDelta = (scoreGap / perfDiff);
                return { id: f1.id, name: f1.name, delta: neededDelta };
            }
            return null;
        }).filter(p => p && p.delta < 0.5); // Only show if "plausible" delta (< 50% shift)

        if (potentialPivots.length > 0) {
            const bestPivot = potentialPivots.sort((a, b) => a.delta - b.delta)[0];
            sensitivity.pivotFound = true;
            sensitivity.factor = bestPivot.name;
            sensitivity.requiredDelta = (bestPivot.delta * 100).toFixed(0);
        }
    }

    const finalResults = ranked.map((res, index) => {
        const topFactor = res.breakdown[0];
        const secondaryFactor = res.breakdown[1];

        let reasoning = `${res.name} ranks #${index + 1} (${res.matchPercentage}% match). `;

        if (res.score > 0.8) {
            reasoning += "This is a **High-Confidence** fit. ";
        } else if (res.score > 0.6) {
            reasoning += "This is a **Balanced** recommendation. ";
        }

        reasoning += `Primary driver: **${topFactor.name}** (contributing ${(topFactor.contribution / res.score * 100).toFixed(0)}% of total score). `;

        if (secondaryFactor && secondaryFactor.contribution > 0.1) {
            reasoning += `Supported by strong performance in **${secondaryFactor.name}**. `;
        }

        const weakness = res.breakdown.find(b => parseFloat(b.performance) < 0.4);
        if (weakness) {
            reasoning += `Potential Risk: Low performance in **${weakness.name}**.`;
        }

        return { ...res, reasoning };
    });

    return {
        ranked: finalResults,
        sensitivity: sensitivity
    };
};
