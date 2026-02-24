/**
 * Situational Decision Engine
 * Calculates scores by weighting situational impacts by user relevance.
 */

/**
 * Situational Decision Engine (Ideal Match Edition)
 * Calculates which option is mathematically closest to the user's "Ideal Profile".
 */

/**
 * Situational Decision Engine (Linear Equation Edition)
 * Score = Σ (coefficient * value)
 * Rank = |UserScore - OptionScore| (The "Ideal Match" distance)
 */

export const evaluateOptions = (options, situations, userAnswers) => {
    // 1. Calculate Target Score for the User based on the Equation
    let userTotalValue = 0;
    situations.forEach(sit => {
        const rating = parseFloat(userAnswers[sit.id] || 5);
        const coeff = sit.coefficient || 1.0;
        userTotalValue += coeff * rating;
    });

    const evaluated = options.map(option => {
        let optionTotalValue = 0;
        const breakdown = [];

        situations.forEach(sit => {
            const coeff = sit.coefficient || 1.0;
            const capability = sit.weights[option.id] || 0;
            const contribution = coeff * capability;

            optionTotalValue += contribution;

            breakdown.push({
                name: sit.label,
                coeff: coeff,
                val: capability,
                contribution: contribution.toFixed(1)
            });
        });

        // Step 5: Analyse proximity to User's Target Value
        const absoluteDifference = Math.abs(userTotalValue - optionTotalValue);

        // Calculate a match percentage based on the relative closeness to the target
        // Max possible difference is sum of coefficients * 10
        const totalMax = situations.reduce((sum, s) => sum + (s.coefficient || 1.0) * 10, 0);
        const matchPercentage = Math.max(0, 100 - (absoluteDifference / totalMax * 200)); // Magnify difference for sensitivity

        return {
            ...option,
            userTotalValue: userTotalValue.toFixed(1),
            optionTotalValue: optionTotalValue.toFixed(1),
            matchPercentage: matchPercentage.toFixed(1),
            breakdown,
            difference: absoluteDifference.toFixed(1)
        };
    });

    // Rank by smallest difference (Closest to target)
    return evaluated.sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));
};
