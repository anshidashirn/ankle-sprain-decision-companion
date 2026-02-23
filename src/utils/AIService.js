/**
 * AI Service (Situational Analysis)
 * Generates specific scenarios based on the user's goal.
 */

export const analyzeGoal = async (goal) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerGoal = goal.toLowerCase();

    // 1. Relocation / City Choice
    if (lowerGoal.includes('city') || lowerGoal.includes('move') || lowerGoal.includes('living')) {
        return {
            situations: [
                { id: 'remote', label: 'Remote Work', question: 'Do you work from home?', weights: { 'austin': 9, 'new_york': 6, 'bali': 10 } },
                { id: 'budget', label: 'Low Cost', question: 'Is saving money a priority?', weights: { 'austin': 6, 'new_york': 2, 'bali': 10 } },
                { id: 'nightlife', label: 'Nightlife', question: 'Do you like bars and clubs?', weights: { 'austin': 7, 'new_york': 10, 'bali': 5 } },
                { id: 'nature', label: 'Nature', question: 'Do you need parks and hiking?', weights: { 'austin': 8, 'new_york': 4, 'bali': 9 } },
                { id: 'transit', label: 'Transit', question: 'Do you want to live without a car?', weights: { 'austin': 4, 'new_york': 10, 'bali': 2 } },
                { id: 'safety', label: 'Safety', question: 'Is low crime critical?', weights: { 'austin': 7, 'new_york': 5, 'bali': 6 } },
                { id: 'weather', label: 'Hot Weather', question: 'Do you prefer warm climates?', weights: { 'austin': 10, 'new_york': 5, 'bali': 10 } },
                { id: 'tech', label: 'Tech Jobs', question: 'Need to be near tech hubs?', weights: { 'austin': 10, 'new_york': 9, 'bali': 3 } }
            ],
            options: [
                { id: 'austin', name: 'Austin, TX', description: 'Sunny tech hub with great balance.' },
                { id: 'new_york', name: 'New York City, NY', description: 'Busy city with 24/7 energy.' },
                { id: 'bali', name: 'Bali, Indonesia', description: 'Cheap living and beautiful beaches.' }
            ]
        };
    }

    // 2. Career Choice
    if (lowerGoal.includes('career') || lowerGoal.includes('job') || lowerGoal.includes('role')) {
        return {
            situations: [
                { id: 'money', label: 'High Pay', question: 'Is a high salary the main goal?', weights: { 'startup': 6, 'corporate': 10, 'freelance': 7 } },
                { id: 'equity', label: 'Equity', question: 'Do you want stock options?', weights: { 'startup': 10, 'corporate': 3, 'freelance': 0 } },
                { id: 'freedom', label: 'Freedom', question: 'Do you want to set your own hours?', weights: { 'startup': 5, 'corporate': 2, 'freelance': 10 } },
                { id: 'security', label: 'Security', question: 'Is job stability important?', weights: { 'startup': 3, 'corporate': 10, 'freelance': 4 } },
                { id: 'growth', label: 'Learning', question: 'Is fast learning a priority?', weights: { 'startup': 10, 'corporate': 6, 'freelance': 8 } },
                { id: 'brand', label: 'Prestige', question: 'Do you care about brand names?', weights: { 'startup': 4, 'corporate': 10, 'freelance': 1 } },
                { id: 'stress', label: 'Low Stress', question: 'Do you want an easy schedule?', weights: { 'startup': 2, 'corporate': 7, 'freelance': 5 } },
                { id: 'team', label: 'Social', question: 'Do you need to work in a team?', weights: { 'startup': 9, 'corporate': 10, 'freelance': 1 } }
            ],
            options: [
                { id: 'startup', name: 'Small Startup', description: 'Fast, risky, and high growth.' },
                { id: 'corporate', name: 'Big Tech Corp', description: 'Stable, high pay, and structured.' },
                { id: 'freelance', name: 'Freelancer', description: 'Self-employed and independent.' }
            ]
        };
    }

    // Default Fallback
    return {
        situations: [
            { id: 'budget', label: 'Budget', question: 'Is cost a big factor?', weights: { 'safe': 10, 'bold': 4, 'middle': 7 } },
            { id: 'time', label: 'Speed', question: 'Do you need results fast?', weights: { 'safe': 9, 'bold': 5, 'middle': 7 } },
            { id: 'risk', label: 'Risk', question: 'Can you handle a total loss?', weights: { 'safe': 2, 'bold': 10, 'middle': 6 } },
            { id: 'impact', label: 'Impact', question: 'Do you want to change things?', weights: { 'safe': 3, 'bold': 10, 'middle': 7 } },
            { id: 'ease', label: 'Ease', question: 'Should it be easy to do?', weights: { 'safe': 9, 'bold': 3, 'middle': 6 } },
            { id: 'longterm', label: 'Duration', question: 'Is this for the long term?', weights: { 'safe': 10, 'bold': 4, 'middle': 8 } },
            { id: 'control', label: 'Control', question: 'Do you need to be in charge?', weights: { 'safe': 4, 'bold': 10, 'middle': 7 } },
            { id: 'fun', label: 'Fun', question: 'Is enjoyment a priority?', weights: { 'safe': 5, 'bold': 9, 'middle': 7 } }
        ],
        options: [
            { id: 'safe', name: 'Safe Path', description: 'Stable but slow progress.' },
            { id: 'bold', name: 'Bold Strategy', description: 'Risky but potentially huge impact.' },
            { id: 'middle', name: 'Balanced Plan', description: 'A mix of safety and growth.' }
        ]
    };
};
