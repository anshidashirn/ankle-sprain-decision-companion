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
                { id: 'remote', label: 'Remote Work', question: 'Will you work from your house most of the time?', weights: { 'austin': 9, 'new_york': 6, 'bali': 10 } },
                { id: 'budget', label: 'Cost of Living', question: 'Is it very important for you to save a lot of money every month?', weights: { 'austin': 6, 'new_york': 2, 'bali': 10 } },
                { id: 'nightlife', label: 'Nightlife', question: 'Do you like to go out at night to places with music and food?', weights: { 'austin': 7, 'new_york': 10, 'bali': 5 } },
                { id: 'nature', label: 'Nature', question: 'Do you need to be near trees, water, or places where you can walk outside?', weights: { 'austin': 8, 'new_york': 4, 'bali': 9 } },
                { id: 'transit', label: 'Transit', question: 'Do you want to live in a place where you do not need to drive a car?', weights: { 'austin': 4, 'new_york': 10, 'bali': 2 } },
                { id: 'safety', label: 'Safety', question: 'Is it very important that the place where you live is safe and quiet?', weights: { 'austin': 7, 'new_york': 5, 'bali': 6 } },
                { id: 'weather', label: 'Weather', question: 'Do you like places that are always hot and have a lot of sun?', weights: { 'austin': 10, 'new_york': 5, 'bali': 10 } },
                { id: 'tech', label: 'Tech Scene', question: 'Do you want to be near other people who work with computers and technology?', weights: { 'austin': 10, 'new_york': 9, 'bali': 3 } }
            ],
            options: [
                { id: 'austin', name: 'Austin, TX', description: 'Austin is a very popular city where many people move to find new jobs. There are many big companies here that build computers and software. The city is famous for having live music everywhere you go. It has many parks and places to swim, which makes people very happy. If you move here, you will find a good balance. It is a bit expensive but it is cheaper than big cities on the coast. It is a great place if you want to grow your career and also enjoy the sun and the outdoors with your friends and family.' },
                { id: 'new_york', name: 'New York City, NY', description: 'New York is one of the biggest and most famous cities in the world. It is a place that never sleeps because there is always something to do, day or night. You can find any kind of food you want and meet people from every country. Most people here use trains and buses to get around, so you do not need a car at all. It is a very busy place with high buildings and lots of energy. If you move here, you will have the chance to work at the biggest companies and see things you can only see in movies. It is expensive, but it offers a life like no other place on earth.' },
                { id: 'bali', name: 'Bali, Indonesia', description: 'Bali is a beautiful island with beaches and green trees everywhere. It is a very cheap place to live, so your money will last a long time. Many people who work on their computers from home choose to live here because life is very slow and relaxed. You can spend your mornings working and your afternoons swimming in the ocean. The people are very kind, and there is a lot of local culture to see. It is the best choice if you want to save money and live a life that feels like a long holiday. It is a very special place for anyone who wants to be close to nature.' }
            ]
        };
    }

    // 2. Career Choice
    if (lowerGoal.includes('career') || lowerGoal.includes('job') || lowerGoal.includes('role')) {
        return {
            situations: [
                { id: 'money', label: 'Salary', question: 'Is getting a lot of money right away the most important thing for you?', weights: { 'startup': 6, 'corporate': 10, 'freelance': 7 } },
                { id: 'equity', label: 'Equity', question: 'Do you want to own a small part of the company where you work?', weights: { 'startup': 10, 'corporate': 3, 'freelance': 0 } },
                { id: 'freedom', label: 'Work Schedule', question: 'Is it important for you to choose exactly when you start and stop working?', weights: { 'startup': 5, 'corporate': 2, 'freelance': 10 } },
                { id: 'security', label: 'Security', question: 'Do you want a job that will last for a long time and is very safe?', weights: { 'startup': 3, 'corporate': 10, 'freelance': 4 } },
                { id: 'growth', label: 'Growth', question: 'Are you okay with more work if it means you learn new things very fast?', weights: { 'startup': 10, 'corporate': 6, 'freelance': 8 } },
                { id: 'brand', label: 'Prestige', question: 'Do you care if the company where you work is famous and well-known?', weights: { 'startup': 4, 'corporate': 10, 'freelance': 1 } },
                { id: 'stress', label: 'Stress Levels', question: 'Do you want a job that is easy and does not make you feel tired or worried?', weights: { 'startup': 2, 'corporate': 7, 'freelance': 5 } },
                { id: 'team', label: 'Teamwork', question: 'Do you like to work very closely with other people in a group?', weights: { 'startup': 9, 'corporate': 10, 'freelance': 1 } }
            ],
            options: [
                { id: 'startup', name: 'Small Startup', description: 'A small startup is a company that is just beginning. Because there are only a few people, you will have to do many different things every day. You will learn very fast and have a lot of power to change things. If the company becomes successful, you could make a lot of money. However, there is also a risk that the company might fail. This is the best choice for people who are brave and want to build something new from the very start. It is an exciting way to work where every day is a new adventure.' },
                { id: 'corporate', name: 'Big Tech Corp', description: 'A big tech company is a very large and famous place to work. They will pay you a lot of money and give you many good things like health care and extra days off. Your job will be very safe, and everyone will know the name of the place where you work. You will work on big projects that millions of people use every day. It is a very organized place where you know exactly what you need to do. This is the best choice if you want to have a comfortable life and a clear path for your future career.' },
                { id: 'freelance', name: 'Freelancer', description: 'Being a freelancer means you are your own boss. You can choose which projects you want to work on and who you want to work with. You can work from your house or from a coffee shop, and you can change your schedule whenever you want. You have total freedom over your life. However, you also have to find your own work and manage your own money. This is the best choice if you value your time more than anything else and want to be truly independent. It is a way of living where you are in control of everything you do.' }
            ]
        };
    }

    // Default Fallback
    return {
        situations: [
            { id: 'budget', label: 'Budget', question: 'How much does the cost move your choice when you think about this?', weights: { 'safe': 10, 'bold': 4, 'middle': 7 } },
            { id: 'time', label: 'Speed', question: 'How fast do you need to see the final result of this choice?', weights: { 'safe': 9, 'bold': 5, 'middle': 7 } },
            { id: 'risk', label: 'Risk', question: 'Are you okay if everything goes wrong and you lose what you put in?', weights: { 'safe': 2, 'bold': 10, 'middle': 6 } },
            { id: 'impact', label: 'Impact', question: 'Is your main goal to help others or change how things are done?', weights: { 'safe': 3, 'bold': 10, 'middle': 7 } },
            { id: 'ease', label: 'Ease', question: 'Do you want this to be simple and easy for you to do?', weights: { 'safe': 9, 'bold': 3, 'middle': 6 } },
            { id: 'longterm', label: 'Duration', question: 'Do you want this choice to stay the best one for many years?', weights: { 'safe': 10, 'bold': 4, 'middle': 8 } },
            { id: 'control', label: 'Control', question: 'Is it important that you are the one who makes every small choice?', weights: { 'safe': 4, 'bold': 10, 'middle': 7 } },
            { id: 'fun', label: 'Enjoyment', question: 'How much do you care about having fun and being happy with the choice?', weights: { 'safe': 5, 'bold': 9, 'middle': 7 } }
        ],
        options: [
            { id: 'safe', name: 'Safe Path', description: 'The safe path is the best way to make sure nothing goes wrong. It is very slow, but you can be sure that you will not lose everything. You will make small steps forward every day. It is like walking on a clear road where you can see everything in front of you. This is the best choice if you do not want to take any big risks and you are happy to wait for good things to happen. It gives you peace of mind because you know you are safe.' },
            { id: 'bold', name: 'Bold Strategy', description: 'The bold strategy is for people who want to win big and are not afraid to lose. It is a very fast and exciting way to move, but it is also very risky. You have to put in a lot of effort and believe in yourself. If it works, the reward will be much bigger than any other choice. This is the best choice if you want to make a huge change and you are willing to take a big chance. It is a choice for those who want to jump high and see how far they can go.' },
            { id: 'middle', name: 'Balanced Plan', description: 'The balanced plan is a mix of the safe path and the bold strategy. You take some risks to get better results, but you also keep a safety net so you do not lose everything. It is a smart way to move forward without being too slow or too dangerous. You get a bit of both worlds: you see some fast growth and you also feel protected. This is the best choice if you want to make progress but you still want to feel that you have a good and stable ground under your feet.' }
        ]
    };
};
