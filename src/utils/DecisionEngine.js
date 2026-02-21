export const evaluateOptions = (options, criteria, injuryDetails) => {
    const totalWeight = criteria.reduce((sum, c) => sum + parseFloat(c.weight || 0), 0);
    const { grade, leg, position, daysSinceInjury, primarySymptom } = injuryDetails || {
        grade: '1',
        leg: 'left',
        position: 'lateral',
        daysSinceInjury: 0,
        primarySymptom: 'pain'
    };

    // Determine Recovery Phase
    let phase = 1; // Acute
    if (daysSinceInjury > 14 || primarySymptom === 'ready') {
        phase = 3; // Remodeling
    } else if (daysSinceInjury > 3 || primarySymptom === 'stiff') {
        phase = 2; // Repair
    }

    if (totalWeight === 0) return options.map(opt => ({ ...opt, score: 0 }));

    const normalizedCriteria = criteria.map(c => ({
        ...c,
        normalizedWeight: parseFloat(c.weight) / totalWeight
    }));

    const evaluated = options.map(option => {
        let baseScore = 0;
        const details = [];
        let gradeMultiplier = 1.0;

        if (grade === '3') {
            if (option.id === 'surgical_intervention') gradeMultiplier = 1.25;
            if (option.id === 'home_rehab') gradeMultiplier = 0.5;
        } else if (grade === '1') {
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

        // Personalized Advice & Exercises
        let advice = `Focus on stability for your ${leg} ${position} ankle.`;
        if (grade === '3') advice = `CRITICAL: Consult a surgeon immediately for your ${leg} ${position} sprain.`;
        if (grade === '1') advice = `Standard protocol is highly effective for your ${leg} ${position} mild sprain.`;

        const exercises = REHAB_PROGRAMS[`phase${phase}`] || [];

        return {
            ...option,
            score: finalScore,
            details,
            advice,
            phase,
            exercises: exercises.filter(ex => ex.suitability.includes(option.id))
        };
    });

    return evaluated.sort((a, b) => b.score - a.score);
};

export const REHAB_PROGRAMS = {
    phase1: [ // Acute (Days 1-7)
        { name: 'Ankle Pumps', description: 'Gently move foot up and down', suitability: ['home_rehab', 'rice_physio'] },
        { name: 'Ice & Elevation', description: '20 mins every 2 hours', suitability: ['home_rehab', 'rice_physio', 'surgical_intervention'] },
        { name: 'Ankle Alphabet', description: 'Draw letters with your toes', suitability: ['home_rehab', 'rice_physio'] }
    ],
    phase2: [ // Repair (Days 7-21)
        { name: 'Towel Curls', description: 'Scrunch a towel with your toes', suitability: ['home_rehab', 'rice_physio'] },
        { name: 'Standing Calf Stretch', description: 'Gentle stretch against a wall', suitability: ['home_rehab', 'rice_physio'] },
        { name: 'Single-leg Balance', description: 'Stand on one leg for 30s', suitability: ['rice_physio'] }
    ],
    phase3: [ // Remodeling (Days 21+)
        { name: 'Proprioception Board', description: 'Use a wobble board for 5 mins', suitability: ['rice_physio'] },
        { name: 'Resisted Eversion', description: 'Use bands to push foot outward', suitability: ['home_rehab', 'rice_physio'] },
        { name: 'Single-leg Squats', description: 'Controlled partial squats', suitability: ['rice_physio'] }
    ]
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
            values: { recovery_speed: 9, pain_management: 8, cost: 3, long_term_stability: 9 }
        },
        {
            id: 'home_rehab',
            name: 'Structured Home Rehab',
            description: 'Self-guided exercises following a standard protocol.',
            values: { recovery_speed: 6, pain_management: 5, cost: 9, long_term_stability: 6 }
        },
        {
            id: 'surgical_intervention',
            name: 'Surgical Repair (Grade III)',
            description: 'Orthopedic surgery for severe ligament tears.',
            values: { recovery_speed: 4, pain_management: 7, cost: 1, long_term_stability: 9 }
        }
    ]
};
