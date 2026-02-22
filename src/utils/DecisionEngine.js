export const evaluateOptions = (options, criteria, injuryDetails) => {
    // injuryDetails contain: pain, swelling, mobility, urgency, budget, riskTolerance, daysSinceInjury
    const {
        pain = 5,
        swelling = 'medium',
        mobilityLabel = 'moderate',
        urgency = 'medium',
        budget = 'medium',
        riskTolerance = 'medium',
        daysSinceInjury = 0
    } = injuryDetails;

    // 1. Dynamic Weight Adjustment based on Personal Priorities
    const adjustedCriteria = criteria.map(c => {
        let weight = parseFloat(c.weight);

        // Adjust weights based on user-defined priorities
        if (c.id === 'recovery_speed' && urgency === 'high') weight += 4;
        if (c.id === 'recovery_speed' && urgency === 'low') weight -= 2;

        if (c.id === 'cost_efficiency' && budget === 'low') weight += 5;
        if (c.id === 'cost_efficiency' && budget === 'high') weight -= 3;

        if (c.id === 'risk_control' && riskTolerance === 'low') weight += 4;
        if (c.id === 'risk_control' && riskTolerance === 'high') weight -= 2;

        // Contextual adjustments based on injury state
        if (c.id === 'pain_management' && pain > 7) weight += 3;

        return { ...c, adjustedWeight: Math.max(1, weight) };
    });

    const totalWeight = adjustedCriteria.reduce((sum, c) => sum + c.adjustedWeight, 0);

    // 2. Determine Recovery Phase
    let phase = 1; // Acute
    if (daysSinceInjury > 14) {
        phase = 3; // Remodeling
    } else if (daysSinceInjury > 3) {
        phase = 2; // Repair
    }

    // 3. Evaluate Each Option
    const evaluated = options.map(option => {
        let rawScore = 0;
        const breakdown = [];

        adjustedCriteria.forEach(criterion => {
            const baseScore = option.values[criterion.id] || 0;
            const weightRatio = criterion.adjustedWeight / totalWeight;
            const contribution = baseScore * weightRatio;

            rawScore += contribution;
            breakdown.push({
                criterion: criterion.name,
                score: baseScore,
                weight: criterion.adjustedWeight.toFixed(1),
                impact: contribution.toFixed(2)
            });
        });

        // 4. Safety & Contextual Filtering (Constraints)
        let constraintPenalty = 0;
        let warnings = [];

        // High Pain + Accelerated Rehab is risky
        if (pain > 8 && option.id === 'accelerated_sports') {
            constraintPenalty = 2.0;
            warnings.push("High pain levels make aggressive rehab risky at this stage.");
        }

        // Early days + Accelerated Rehab
        if (daysSinceInjury < 3 && option.id === 'accelerated_sports') {
            constraintPenalty = 1.5;
            warnings.push("Initial inflammation phase requires more protection.");
        }

        const finalScore = Math.max(0, Math.min(10, rawScore - constraintPenalty)).toFixed(2);

        // 5. Generate Explanation Reasoning
        const topCriteria = [...breakdown].sort((a, b) => b.impact - a.impact).slice(0, 2);
        const reasoning = `${option.name} ranks well primarily due to its strong performance in ${topCriteria[0].criterion} and ${topCriteria[1].criterion}, aligned with your priorities.`;

        return {
            ...option,
            score: finalScore,
            breakdown,
            reasoning,
            warnings,
            phase,
            exercises: (REHAB_PROGRAMS[`phase${phase}`] || []).filter(ex => ex.suitability.includes(option.id))
        };
    });

    return evaluated.sort((a, b) => b.score - a.score);
};

export const REHAB_PROGRAMS = {
    phase1: [
        { name: 'R.I.C.E Protocol', description: 'Rest, Ice, Compression, Elevation for 15-20 mins every 2-3 hours.', suitability: ['rest_focused', 'home_exercise', 'physiotherapy_guided'] },
        { name: 'Ankle Pumps', description: 'Gently move foot up and down to reduce swelling.', suitability: ['rest_focused', 'home_exercise', 'physiotherapy_guided'] },
        { name: 'Ankle Alphabet', description: 'Trace letters with your big toe to maintain range of motion.', suitability: ['home_exercise', 'physiotherapy_guided'] }
    ],
    phase2: [
        { name: 'Isometric Eversion', description: 'Push side of foot against a wall without moving the joint.', suitability: ['home_exercise', 'physiotherapy_guided', 'accelerated_sports'] },
        { name: 'Standing Calf Stretch', description: 'Leaning against wall with heel down.', suitability: ['home_exercise', 'physiotherapy_guided'] },
        { name: 'Single Leg Balance', description: 'Stand on injured leg for 30s. Progress to closing eyes.', suitability: ['physiotherapy_guided', 'accelerated_sports'] }
    ],
    phase3: [
        { name: 'Proprioceptive Drills', description: 'Wobble board or foam pad balance exercises.', suitability: ['physiotherapy_guided', 'accelerated_sports'] },
        { name: 'Resistance Band Inversions', description: 'Strengthen the inner ankle ligaments.', suitability: ['home_exercise', 'physiotherapy_guided', 'accelerated_sports'] },
        { name: 'Agility Ladders', description: 'Low-impact lateral movements to prepare for sports.', suitability: ['accelerated_sports'] }
    ]
};

export const REHAB_DEFAULTS = {
    criteria: [
        { id: 'pain_management', name: 'Pain Management', weight: 5 },
        { id: 'mobility_improvement', name: 'Mobility Improvement', weight: 4 },
        { id: 'cost_efficiency', name: 'Cost Efficiency', weight: 3 },
        { id: 'recovery_speed', name: 'Recovery Speed', weight: 3 },
        { id: 'risk_control', name: 'Risk Control', weight: 5 }
    ],
    options: [
        {
            id: 'rest_focused',
            name: 'Rest-Focused Recovery',
            description: 'Conservative approach focusing on healing and protection.',
            values: { pain_management: 9, mobility_improvement: 5, cost_efficiency: 9, recovery_speed: 3, risk_control: 8 }
        },
        {
            id: 'home_exercise',
            name: 'Home Exercise Program',
            description: 'Self-managed rehabilitation using standard guided protocols.',
            values: { pain_management: 6, mobility_improvement: 7, cost_efficiency: 9, recovery_speed: 6, risk_control: 6 }
        },
        {
            id: 'physiotherapy_guided',
            name: 'Physiotherapy-Guided Rehab',
            description: 'Supervised sessions with expert manual therapy and equipment.',
            values: { pain_management: 8, mobility_improvement: 9, cost_efficiency: 4, recovery_speed: 7, risk_control: 9 }
        },
        {
            id: 'accelerated_sports',
            name: 'Accelerated Sports Rehab',
            description: 'Aggressive protocol aimed at rapid return to high-level activity.',
            values: { pain_management: 4, mobility_improvement: 8, cost_efficiency: 3, recovery_speed: 10, risk_control: 4 }
        }
    ]
};
