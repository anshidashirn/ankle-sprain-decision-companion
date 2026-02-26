/**
 * Structured Decision Engine (MCDA - Weighted Sum Model)
 * 1. Score = Σ (Value_opt,crit * Weight_user,crit)
 * 2. Normalization to 100%
 * 3. Narrative Explanation Generation
 */

export const evaluateOptions = (options, criteria, userWeights, optionWeights = {}) => {
    // 1. Calculate weighted scores for each option
    const evaluated = options.map(option => {
        let absoluteScore = 0;
        let maxPossibleScore = 0;
        const breakdown = [];

        criteria.forEach(crit => {
            const weight = parseFloat(userWeights[crit.id] || 5); // User importance (1-10)
            const performance = crit.weights[option.id] || 0;    // Option performance on this crit (1-10)

            const contribution = weight * performance;
            absoluteScore += contribution;
            maxPossibleScore += weight * 10; // Max performance is 10

            breakdown.push({
                id: crit.id,
                name: crit.label,
                weight: weight,
                performance: performance,
                contribution: contribution.toFixed(1)
            });
        });

        // Apply Option Weight (Multiplier Effect)
        const optionWeightValue = parseFloat(optionWeights[option.id] || 5); // Default to middle ground if not provided
        const finalScore = absoluteScore * (optionWeightValue / 5); // Scale relative to 5 (neutral)
        const finalMax = maxPossibleScore * (optionWeightValue / 5);

        const matchPercentage = finalMax > 0
            ? (finalScore / finalMax) * 100
            : 0;

        return {
            ...option,
            optionWeight: optionWeightValue,
            score: finalScore.toFixed(1),
            matchPercentage: matchPercentage.toFixed(1),
            breakdown: breakdown.sort((a, b) => b.performance - a.performance) // Sort by strengths
        };
    });

    // 2. Rank by score descending
    const ranked = evaluated.sort((a, b) => b.score - a.score);

    // 3. Generate reasoning for each
    return ranked.map((res, index) => {
        const topStrength = res.breakdown[0];
        const weakestPoint = res.breakdown[res.breakdown.length - 1];

        let reasoning = `${res.name} ranks #${index + 1} with a ${res.matchPercentage}% match. `;
        reasoning += `It excels particularly in **${topStrength.name}** (rated ${topStrength.performance}/10). `;

        if (parseFloat(weakestPoint.performance) < 5) {
            reasoning += `However, it may be weaker in terms of **${weakestPoint.name}**.`;
        } else {
            reasoning += `It also maintains a solid standard across other criteria.`;
        }

        return { ...res, reasoning };
    });
};
