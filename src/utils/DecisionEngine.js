export const evaluateOptions = (options, criteria, injuryDetails) => {
    const totalWeight = criteria.reduce((sum, c) => sum + parseFloat(c.weight || 0), 0);
    const { grade, leg, position } = injuryDetails || { grade: '1', leg: 'left', position: 'lateral' };

    if (totalWeight === 0) return options.map(opt => ({ ...opt, score: 0 }));

    const normalizedCriteria = criteria.map(c => ({
        ...c,
        normalizedWeight: parseFloat(c.weight) / totalWeight
    }));

    const evaluated = options.map(option => {
        let baseScore = 0;
        const details = [];
        let gradeMultiplier = 1.0;

        // Custom Logic for Injury Grades
        if (grade === '3') {
            // For Grade III, surgical options are more prioritized, home rehab is discouraged
            if (option.id === 'surgical_intervention') gradeMultiplier = 1.25;
            if (option.id === 'home_rehab') gradeMultiplier = 0.5;
        } else if (grade === '1') {
            // For Grade I, surgical is overkill
            if (option.id === 'surgical_intervention') gradeMultiplier = 0.2;
            if (option.id === 'home_rehab') gradeMultiplier = 1.1;
        }

        normalizedCriteria.forEach(criterion => {
            const val = parseFloat(option.values[criterion.id] || 0);
            const contribution = val * criterion.normalizedWeight;
            baseScore += contribution;

            details.push({
                criterionName: criterion.name,
                value: val,
                weight: criterion.weight,
                contribution: contribution.toFixed(2)
            });
        });

        const finalScore = Math.min((baseScore * 10 * gradeMultiplier), 10).toFixed(2);

        // Personalized Advice
        let advice = `Focus on stability for your ${leg} ${position} ankle.`;
        if (grade === '3') advice = `CRITICAL: Consult a surgeon immediately for your ${leg} ${position} sprain.`;
        if (grade === '1') advice = `Standard protocol is highly effective for your ${leg} ${position} mild sprain.`;

        return {
            ...option,
            score: finalScore,
            details,
            advice
        };
    });

    return evaluated.sort((a, b) => b.score - a.score);
};

// Simple test suite for verification
export const runTests = () => {
    const testCriteria = [
        { id: 'c1', name: 'Crit 1', weight: 10 },
        { id: 'c2', name: 'Crit 2', weight: 0 }
    ];
    const testOptions = [
        { id: 'o1', name: 'Opt 1', values: { c1: 10, c2: 5 } },
        { id: 'o2', name: 'Opt 2', values: { c1: 5, c2: 10 } }
    ];

    const results = evaluateOptions(testOptions, testCriteria);

    const tests = [
        { name: 'Rank 1 is correctly identified', pass: results[0].id === 'o1' },
        { name: 'Score is correctly calculated (10/10)', pass: results[0].score === '10.00' },
        { name: 'Weight 0 is ignored correctly', pass: results[1].score === '5.00' }
    ];

    console.log('--- Verification Tests ---');
    tests.forEach(t => console.log(`${t.pass ? '✅' : '❌'} ${t.name}`));
    return tests;
};

export const REHAB_DEFAULTS = {
    criteria: [
        { id: 'recovery_speed', name: 'Recovery Speed', weight: 8, description: 'How fast you can return to sports/work' },
        { id: 'pain_management', name: 'Pain Management', weight: 6, description: 'Effectiveness in reducing acute pain' },
        { id: 'cost', name: 'Cost Efficiency', weight: 4, description: 'Affordability of the treatment' },
        { id: 'long_term_stability', name: 'Long-term Stability', weight: 9, description: 'Risk of re-injury reduction' },
    ],
    options: [
        {
            id: 'rice_physio',
            name: 'R.I.C.E + Professional Physio',
            description: 'Rest, Ice, Compression, Elevation combined with clinical physical therapy.',
            values: {
                recovery_speed: 9,
                pain_management: 8,
                cost: 3,
                long_term_stability: 9
            }
        },
        {
            id: 'home_rehab',
            name: 'Structured Home Rehab',
            description: 'Self-guided exercises following a standard protocol.',
            values: {
                recovery_speed: 6,
                pain_management: 5,
                cost: 9,
                long_term_stability: 6
            }
        },
        {
            id: 'surgical_intervention',
            name: 'Surgical Repair (Grade III)',
            description: 'Orthopedic surgery for severe ligament tears.',
            values: {
                recovery_speed: 4,
                pain_management: 7,
                cost: 1,
                long_term_stability: 9
            }
        }
    ]
};
