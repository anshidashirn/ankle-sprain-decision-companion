/**
 * Situational Decision Engine
 * Calculates scores by weighting situational impacts by user relevance.
 */

export const evaluateOptions = (options, situations, userAnswers) => {
    /**
     * options: Array of { id, name, description }
     * situations: Array of { id, question, weights: { optionId: 0-10 } }
     * userAnswers: Object of { situationId: 1-10 (relevance/yes-ness) }
     */

    const totalUserWeight = Object.values(userAnswers).reduce((sum, val) => sum + val, 0) || 1;

    const evaluated = options.map(option => {
        let rawScore = 0;
        const breakdown = [];

        situations.forEach(sit => {
            const userRelevance = parseFloat(userAnswers[sit.id] || 0);
            const optionImpact = sit.weights[option.id] || 0;

            // The score contribution is how well the option handles this situation
            // weighted by how relevant the situation is to the user.
            const contribution = (optionImpact * userRelevance) / totalUserWeight;

            rawScore += contribution;
            breakdown.push({
                criterion: sit.id.replace('_', ' ').toUpperCase(),
                name: sit.question.split('?')[0].slice(0, 30) + '...',
                score: optionImpact,
                relevance: userRelevance,
                impact: contribution.toFixed(2)
            });
        });

        // Normalize and generate reasoning
        const finalScore = Math.max(0, Math.min(10, rawScore)).toFixed(2);

        return {
            ...option,
            score: finalScore,
            breakdown,
            warnings: []
        };
    });

    return evaluated.sort((a, b) => b.score - a.score);
};
