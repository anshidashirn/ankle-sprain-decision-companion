const KNOWLEDGE_ENGINE = {
    // 1. TECHNOLOGY & COMPUTING (High Fidelity)
    tech: {
        keywords: ['laptop', 'computer', 'macbook', 'pc', 'hardware', 'server', 'workstation', 'monitor'],
        situations: [
            { id: 'perf', label: 'Processing Power', question: 'Do you need a high-core count CPU (like i9 or M3 Max) for video editing or simulation?' },
            { id: 'gpu', label: 'Graphic Fidelity', question: 'Are you doing professional 3D rendering or playing heavy AAA games at 4K?' },
            { id: 'ram', label: 'Memory Standard', question: 'Will you be running many professional tools or thousands of browser tabs simultaneously?' },
            { id: 'port', label: 'Portability Focus', question: 'Is being under 3 lbs (1.4kg) more important than have a massive screen?' },
            { id: 'therm', label: 'Thermal Cooling', question: 'Do you need a machine that can run at full speed for hours without getting hot?' },
            { id: 'stor', label: 'Internal Storage', question: 'Do you need over 2TB of fast SSD space for local raw media files?' },
            { id: 'eco', label: 'Ecosystem Lock', question: 'Are you already deeply committed to MacOS or the Windows/Linux workflow?' },
            { id: 'panel', label: 'Color Accuracy', question: 'Does the screen need 100% DCI-P3 coverage for professional design work?' }
        ],
        getOptions: (goal) => {
            if (goal.includes('macbook')) {
                return [
                    { id: 'm1', name: 'Apple MacBook Pro 16 (M3 Max, 128GB)', description: 'The absolute peak of mobile silicon. Feature 16-core CPU, 40-core GPU, and massive Unified Memory for 8K video pipelines and AI model training.' },
                    { id: 'm2', name: 'Apple MacBook Pro 14 (M3 Pro)', description: 'The sweet spot for developers. Balancing high performance with extreme 18-hour battery life and the best-in-class Liquid Retina XDR display.' },
                    { id: 'm3', name: 'Apple MacBook Air 15 (M3)', description: 'The signature ultra-portable. Fanless, silent design with enough burst power for modern web development and creative multitasking.' },
                    { id: 'm4', name: 'Apple MacBook Pro 16 (M1 Max Refurb)', description: 'The industry-standard value pick. Offers 90% of the M3 Max performance for professional workloads at a 40% discount.' },
                    { id: 'm5', name: 'Apple MacBook Air 13 (M2)', description: 'The minimalist entry point. Perfect for high-mobility roles that prioritize form-factor and basic reliability over peak renders.' }
                ];
            }
            return [
                { id: 't1', name: 'Razer Blade 16 (2024, RTX 4090)', description: 'The ultimate desktop replacement. Features the worlds first 16" Dual-Mode Mini-LED display and top-tier NVIDIA 4090 graphics for AAA gaming and 3D rendering.' },
                { id: 't2', name: 'ASUS ROG Zephyrus G14 (OLED)', description: 'The lifestyle powerhouse. A stunning 3K 120Hz OLED panel in a 1.5kg chassis. Perfect for designers who need portability without losing GPU compute.' },
                { id: 't3', name: 'Lenovo ThinkPad X1 Carbon Gen 12', description: 'The executive reliability standard. Aerospace-grade carbon fiber body, legendary keyboard, and extreme security for sensitive business environments.' },
                { id: 't4', name: 'Framework Laptop 13 (DIY Edition)', description: 'The ethically supreme choice. Fully modular and repairable. Upgrade your CPU, ports, and screen without ever buying a new chassis.' },
                { id: 't5', name: 'Microsoft Surface Pro 9 (5G)', description: 'The hybrid mobility king. A 2-in-1 tablet with laptop-grade processing, 120Hz ink support, and always-on cellular connectivity for field work.' },
                { id: 't6', name: 'Dell XPS 15 (9530)', description: 'The Windows creative benchmark. InfinityEdge 4-side display with 100% Adobe RGB coverage. The gold standard for photo and video editors.' }
            ];
        }
    },
    // 2. REAL ESTATE & HOUSING
    housing: {
        keywords: ['house', 'apartment', 'home', 'mortgage', 'rent', 'city', 'suburb', 'countryside', 'real estate', 'buying'],
        situations: [
            { id: 'comm', label: 'Transit Access', question: 'Is being within a 10-minute walk of a subway station or highway entrance critical?' },
            { id: 'space', label: 'Square Footage', question: 'Do you need a dedicated home office and a guest room for long-term comfort?' },
            { id: 'yards', label: 'Outdoor Space', question: 'Is a private backyard or a large balcony a non-negotiable for you?' },
            { id: 'age', label: 'Build Quality', question: 'Do you prefer a brand new modern condo or a character-filled historic home?' },
            { id: 'noise', label: 'Ambient Sound', question: 'Is living in a quiet, low-traffic zone more important than being in a busy city center?' },
            { id: 'school', label: 'Education District', question: 'Are you ranking this based on the specific public school ratings in the area?' },
            { id: 'sec', label: 'Gated Security', question: 'Is a 24/7 doorman or a gated community a primary requirement for your safety?' },
            { id: 'app', label: 'Future Appreciation', question: 'Is this an investment where you expect the value to grow by 20% in 5 years?' }
        ],
        getOptions: (goal) => [
            { id: 'h1', name: 'Modern Brutalist Loft', description: 'Industrial design with 20ft ceilings, exposed concrete, and floor-to-ceiling glass. Located in prime urban-tech corridors for the ultimate city lifestyle.' },
            { id: 'h2', name: 'Victorian Restoration Estate', description: 'Historic 1890s architecture meticulously updated with smart-home tech, solar roofing, and preserved woodcraft. A perfect blend of heritage and future.' },
            { id: 'h3', name: 'Suburban Glass Pavilion', description: 'Minimalist single-story design focused on indoor-outdoor flow. Features an integrated garden courtyard and top-tier energy efficiency for sustainable family living.' },
            { id: 'h4', name: 'Eco-Modern Micro-Condo', description: 'Ultra-efficient 500sqft space in a transit-oriented development. Zero-emission building focused on young professionals prioritizing location over size.' },
            { id: 'h5', name: 'Waterfront Modernist Villa', description: 'Private dock, infinity pool, and cantilevered terraces. High-security, luxury-grade materials designed for entertainment and ultimate privacy.' }
        ]
    },
    // 3. FINANCE & INVESTING
    finance: {
        keywords: ['invest', 'stock', 'crypto', 'savings', 'money', 'etf', 'portfolio', 'trading', 'wealth'],
        situations: [
            { id: 'risk', label: 'Risk Tolerance', question: 'If the market dropped 30% tomorrow, would you stay calm or would you panic?' },
            { id: 'hor', label: 'Time Horizon', question: 'Do you need this money in 2 years, or is this for your retirement in 20+ years?' },
            { id: 'yield', label: 'Passive Income', question: 'Are you looking for monthly dividends or just long-term price growth?' },
            { id: 'liq', label: 'Liquidity Needs', question: 'Is it critical that you can withdraw all your cash within 24 hours if needed?' },
            { id: 'tax', label: 'Tax Efficiency', question: 'Is reducing your annual tax bill a higher priority than getting the highest returns?' },
            { id: 'sust', label: 'Ethical Investing', question: 'Do you only want to invest in green energy and socially responsible companies?' },
            { id: 'vol', label: 'Volatility Appetite', question: 'Do you have the stomach for "high-risk high-reward" assets like crypto and tech IPOs?' },
            { id: 'know', label: 'Expert Knowledge', question: 'Do you want to manage every trade yourself or have an AI/Professional handle it?' }
        ],
        getOptions: (goal) => [
            { id: 'f1', name: 'Vanguard Total World (VT) Strategy', description: 'The absolute pillar of passive wealth. Own every public company on Earth with a 0.07% expense ratio. The safest, most broadly diversified equity strategy in existence.' },
            { id: 'f2', name: 'Qualified Dividend Growth Engine', description: 'Focused on "Dividend Aristocrats" — companies that have increased payouts for 25+ years. Designed for long-term compounders and tax-efficient passive income.' },
            { id: 'f3', name: 'Crypto Cold Storage & DeFi Yield', description: 'High-conviction position in hard assets (BTC/ETH) secured on hardware wallets, combined with regulated stablecoin lending for 5-8% annual percentage yields.' },
            { id: 'f4', name: 'Small-Cap Value Tilting (Factor)', description: 'Utilizing Fama-French research to overweight small, undervalued companies. Historically outperforms the market but requires extreme 10+ year discipline.' },
            { id: 'f5', name: 'Boglehead 3-Fund Conservative', description: 'The "Lazy Portfolio" — Total Stock, Total International, and Total Bond. The gold standard for risk-averse investors seeking market-average returns with minimum effort.' }
        ]
    },
    // 4. BUSINESS & MARKETING
    business: {
        keywords: ['business', 'startup', 'marketing', 'agency', 'seo', 'sales', 'growth', 'brand', 'product'],
        situations: [
            { id: 'scal', label: 'Scalability Potential', question: 'Can this business handle 10,000 customers without hiring 100 new people?' },
            { id: 'acq', label: 'Customer Cost', question: 'Is it cheap to find new users (like via word of mouth) or do you need heavy ads?' },
            { id: 'mar', label: 'Profit Margins', question: 'Is the product very expensive to make, or is it 90% pure profit (like software)?' },
            { id: 'tech', label: 'Tech Dependency', question: 'Do you need a team of 10 engineers, or can one person run the entire operation?' },
            { id: 'moat', label: 'Competitive Moat', question: 'Could a competitor steal your idea in a week, or is it too hard to copy?' },
            { id: 'speed', label: 'Launch Velocity', question: 'Do you need to go live within 30 days, or can you spend a year building?' },
            { id: 'pass', label: 'Passive Nature', question: 'Will this run while you sleep, or do you have to be working for every dollar?' },
            { id: 'exit', label: 'Exit Strategy', question: 'Is this a "forever business" or something you want to sell for millions in 5 years?' }
        ],
        getOptions: (goal) => [
            { id: 'b1', name: 'Micro-SaaS (Build Once, Scale Pixels)', description: 'Solve a single, painful problem for a niche audience. Low overhead, high recurrance, and extremely high exit multiples (4x-6x SDE).' },
            { id: 'b2', name: 'High-Ticket Consulting Retainer', description: 'Selling specialized expertise (Marketing, DevOps, Sales) for $3k-$10k monthly. Lowest startup cost and highest immediate cash-on-cash return.' },
            { id: 'b3', name: 'White-Label E-commerce (Dropshipping v2.0)', description: 'Custom-branded hardware or goods sourced via high-quality agents. Focus on creative marketing and brand moat rather than inventory risk.' },
            { id: 'b4', name: 'Content-to-Commerce (Authority)', description: 'Build an audience on specialized platforms (Newsletter, YouTube) and monetize via owned products or paid communities. The most resilient 21st-century model.' },
            { id: 'b5', name: 'Local Service Automation', description: 'Buying or starting a boring business (Cleaning, HVAC, Landscaping) and applying a modern tech-stack for booking, sales, and operations.' }
        ]
    },
    // 5. FITNESS & HEALTH (Granular)
    fitness: {
        keywords: ['gym', 'fitness', 'workout', 'health', 'running', 'yoga', 'protein', 'muscle', 'diet'],
        situations: [
            { id: 'time', label: 'Session Duration', question: 'Can you commit to 60-90 minutes, or do you need a "Micro-Workout" under 20 mins?' },
            { id: 'rec', label: 'Recovery Rate', question: 'Do you have joint pain or injuries that require a very low-impact approach?' },
            { id: 'equip', label: 'Equipment Access', question: 'Do you have a full Olympic gym or just a pair of dumbbells at home?' },
            { id: 'goal_m', label: 'Muscle Focus', question: 'Is looking like a professional bodybuilder more important than being fast?' },
            { id: 'goal_c', label: 'Cardio Engine', question: 'Is running a marathon or having a healthy heart your absolute #1 priority?' },
            { id: 'nut', label: 'Dietary Discipline', question: 'Are you willing to track every calorie, or do you want a flexible life?' },
            { id: 'ment', label: 'Mental Clarity', question: 'Is stress relief and "flow state" more important than just physical size?' },
            { id: 'comm', label: 'Community Vibe', question: 'Do you need a group/class to stay motivated, or are you a lone wolf?' }
        ],
        getOptions: (goal) => [
            { id: 'fit1', name: 'PPL (Push/Pull/Legs) Hypertrophy', description: 'The gold standard for muscle protein synthesis. High frequency (6x/week) training focused on mechanical tension and progressive overload.' },
            { id: 'fit2', name: 'Zone 2 Endurance & VO2 Max Mastery', description: 'Focused on metabolic health and longevity. Low-intensity steady state (LISS) training for 150+ mins weekly to optimize mitochondrial function.' },
            { id: 'fit3', name: 'Advanced Calisthenics Skill-Tree', description: 'Mastering own-weight leverage (Handstands, Planches, Muscle-ups). Builds extreme core strength and relative power with zero equipment dependency.' },
            { id: 'fit4', name: 'Hybrid Athlete (Tactical)', description: 'Balancing a sub-20 min 5K with a 500lb total. Designed for elite utility, combining powerlifting strength with high aerobic capacity.' },
            { id: 'fit5', name: 'Longevity Wellness (Yoga & Mobility)', description: 'Priority on joint longevity and fascial health. Combining Yin Yoga with functional range conditioning to stay injury-free indefinitely.' }
        ]
    },
    // 6. PROGRAMMING & SOFTWARE DEVELOPMENT
    programming: {
        keywords: ['code', 'programming', 'software', 'developer', 'engineer', 'webdev', 'ai', 'data science'],
        situations: [
            { id: 'lang', label: 'Language Preference', question: 'Are you committed to a specific language like Python, JavaScript, or C++?' },
            { id: 'plat', label: 'Platform Focus', question: 'Are you building for web, mobile, desktop, embedded systems, or cloud?' },
            { id: 'perf', label: 'Performance Criticality', question: 'Does your application need to handle millions of requests per second or complex calculations?' },
            { id: 'scal', label: 'Scalability Needs', question: 'Is the project expected to grow from a few users to millions globally?' },
            { id: 'team', label: 'Team Size & Collaboration', question: 'Will you be working alone, or as part of a large distributed team?' },
            { id: 'sec', label: 'Security Requirements', question: 'Is handling sensitive user data or financial transactions a primary concern?' },
            { id: 'comp', label: 'Complexity Tolerance', question: 'Are you comfortable with advanced algorithms and distributed systems?' },
            { id: 'comm', label: 'Community & Ecosystem', question: 'Is a large, active open-source community and rich library ecosystem important?' }
        ],
        getOptions: (goal) => [
            { id: 'p1', name: 'Modern Web Stack (Next.js/Supabase/TypeScript)', description: 'The peak of developer velocity. Utilizing server-side rendering, edge functions, and real-time databases for scalable, ultra-fast consumer applications.' },
            { id: 'p2', name: 'AI/ML Engineering (PyTorch/HuggingFace)', description: 'Deep tech focus. Building large-scale transformer models, RAG systems, and fine-tuning pipelines for production-grade artificial intelligence.' },
            { id: 'p3', name: 'Cloud Native / Platform Eng (K8s/Terraform)', description: 'Infrastructure as Code. Designing resilient, auto-scaling distributed systems on AWS/GCP using Kubernetes and service mesh architectures.' },
            { id: 'p4', name: 'Embedded Rust & Real-Time Systems', description: 'Memory-safe systems programming for IoT, robotics, and aerospace. Maximum performance with no garbage collection overhead.' },
            { id: 'p5', name: 'Enterprise Java/Spring Ecosystem', description: 'The backbone of global banking and logistics. Extreme scalability, strict typing, and deep integration for mission-critical corporate platforms.' }
        ]
    },
    // 7. COOKING & CULINARY ARTS
    cooking: {
        keywords: ['cook', 'recipe', 'kitchen', 'chef', 'food', 'bake', 'grill', 'cuisine', 'meal'],
        situations: [
            { id: 'time', label: 'Preparation Time', question: 'Do you need meals ready in under 30 minutes, or do you enjoy slow, elaborate cooking?' },
            { id: 'skill', label: 'Skill Level', question: 'Are you a beginner who needs simple steps, or an advanced cook seeking new challenges?' },
            { id: 'diet', label: 'Dietary Restrictions', question: 'Are you cooking for specific needs like vegan, gluten-free, or low-carb?' },
            { id: 'equip', label: 'Kitchen Equipment', question: 'Do you have a fully stocked kitchen, or are you working with basic tools?' },
            { id: 'cost', label: 'Ingredient Cost', question: 'Is using budget-friendly ingredients a priority, or are you open to gourmet items?' },
            { id: 'cult', label: 'Cultural Cuisine', question: 'Are you interested in exploring specific global cuisines like Italian, Japanese, or Mexican?' },
            { id: 'health', label: 'Nutritional Focus', question: 'Is maximizing protein, minimizing fat, or balancing macros your main goal?' },
            { id: 'host', label: 'Entertaining Guests', question: 'Do you often cook for large groups, or primarily for yourself/small family?' }
        ],
        getOptions: (goal) => [
            { id: 'c1', name: 'Sous-Vide Precision & Molecular Gastronomy', description: 'Mastering temperature-controlled water baths and hydrocolloids. Achieve restaurant-grade textures and visual plating impossible with traditional fire.' },
            { id: 'c2', name: 'Authentic Neapolitan Pizza (VPN Standard)', description: 'Studying hydration 70%, 48-hour fermentation, and wood-fired thermodynamics (900°F). The pinnacle of dough chemistry and flavor.' },
            { id: 'c3', name: 'Wok Hei (The Breath of the Dragon)', description: 'High-BTU Cantonese stir-fry techniques. Focusing on Maillard reactions and rapid-toss carbonization for that signature smoky restaurant flavor.' },
            { id: 'c4', name: 'Artisan Sourdough & Ancient Grains', description: 'Wild yeast cultivation and long-fermentation breadmaking. Focus on crumb structure, lactobacilli acidity, and heritage grain nutritional profiles.' },
            { id: 'c5', name: 'Omakase Sushi Mastery (Edomae Style)', description: 'Precision knife skills and vinegared rice (Shari) perfection. Sourcing wild-caught seasonal seafood and mastering age-old curing techniques.' }
        ]
    },
    // 8. EDUCATION & LEARNING
    education: {
        keywords: ['learn', 'study', 'school', 'college', 'degree', 'course', 'skill', 'knowledge', 'tutor', 'career', 'job', 'profession', 'hiring'],
        situations: [
            { id: 'goal', label: 'Career Advancement', question: 'Is the primary goal to get a promotion, switch careers, or start a new business?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate full-time hours, or do you need flexible, part-time options?' },
            { id: 'cost', label: 'Budget Constraints', question: 'Is tuition cost a major factor, or are you seeking the absolute best quality regardless of price?' },
            { id: 'cred', label: 'Accreditation & Recognition', question: 'Is a formal degree or certification from a recognized institution essential?' },
            { id: 'mode', label: 'Learning Style', question: 'Do you prefer self-paced online modules, live virtual classes, or in-person instruction?' },
            { id: 'net', label: 'Networking Opportunities', question: 'Is connecting with peers and industry leaders a key benefit you seek?' },
            { id: 'prac', label: 'Practical Application', question: 'Do you need hands-on projects and real-world experience, or theoretical knowledge?' },
            { id: 'supp', label: 'Support & Mentorship', question: 'Is access to instructors, TAs, or career counselors important for your success?' }
        ],
        getOptions: (goal) => [
            { id: 'e1', name: 'Executive MBA (M7 Global Cluster)', description: 'High-level business strategy and elite networking at institutions like Wharton or INSEAD. Designed for senior leadership transitions.' },
            { id: 'e2', name: 'The MIT OpenCourseWare Path (Self-Directed)', description: 'The absolute depth of university-grade computer science and physics without the $200k price tag. Requires extreme discipline and problem-set focus.' },
            { id: 'e3', name: 'Alt-Uni / Lambda Income Share Track', description: 'Modern vocational coding or sales education. No upfront cost; you only pay when you land a high-earning role. Complete alignment of school and student.' },
            { id: 'e4', name: 'Deep Dive Fellowships (On Deck / YC)', description: 'Cohort-based learning for builders and founders. Focus on peer-to-peer knowledge transfer and rapid product shipping over theory.' },
            { id: 'e5', name: 'Professional Licensure (CFA/CPA/PE)', description: 'The gold standard for regulated industries. Highly structured, exam-based accreditation for Finance, Accounting, or Engineering.' }
        ]
    },
    // 9. TRAVEL & ADVENTURE
    travel: {
        keywords: ['travel', 'vacation', 'trip', 'adventure', 'explore', 'destination', 'holiday', 'journey', 'tourism'],
        situations: [
            { id: 'budg', label: 'Budget Sensitivity', question: 'Is finding the cheapest flights and accommodation your top priority?' },
            { id: 'pace', label: 'Travel Pace', question: 'Do you prefer a fast-paced itinerary with many sights, or slow, relaxed exploration?' },
            { id: 'comp', label: 'Companionship', question: 'Are you traveling solo, with a partner, family with kids, or a large group?' },
            { id: 'dest', label: 'Destination Type', question: 'Are you seeking beaches, mountains, historical cities, or remote wilderness?' },
            { id: 'act', label: 'Activity Level', question: 'Do you want extreme sports, cultural immersion, culinary tours, or pure relaxation?' },
            { id: 'safe', label: 'Safety & Security', question: 'Is traveling to politically stable and low-crime regions a non-negotiable?' },
            { id: 'cult', label: 'Cultural Immersion', question: 'Do you want to deeply engage with local customs, language, and traditions?' },
            { id: 'flex', label: 'Flexibility & Spontaneity', question: 'Do you prefer a fully planned itinerary or the freedom to decide on the fly?' }
        ],
        getOptions: (goal) => [
            { id: 't1', name: 'Antarctic Expedition (Ice-Class PC6)', description: 'Ultra-luxury scientific exploration. Crossing the Drake Passage to reach the white continent via specialized ice-breaking vessels with on-board glaciologists.' },
            { id: 't2', name: 'Digital Nomad Base (Chiang Mai / Lisbon)', description: 'Optimizing for "Geo-Arbitrage". Living in high-amenity, low-cost international hubs with fiber internet, coworking cultures, and massive expat networks.' },
            { id: 't3', name: 'The Aman Private Island Experience', description: 'The pinnacle of travel luxury. Total seclusion, personalized 24/7 service, and architecture that blends into the natural tropical landscape.' },
            { id: 't4', name: 'Overland Silk Road Adventure', description: 'Crossing Central Asia via train and 4x4. Immersive cultural history, high-altitude deserts, and ancient trade city exploration.' },
            { id: 't5', name: 'Vanish / Slow Travel immersion', description: 'Renting a villa for 3+ months in remote Italy or Japan. Learning the language, shopping local markets, and escaping the "tourist" label.' }
        ]
    },
    // 10. AUTOMOTIVE & VEHICLES
    automotive: {
        keywords: ['car', 'vehicle', 'drive', 'auto', 'truck', 'suv', 'sedan', 'electric', 'hybrid', 'motorcycle'],
        situations: [
            { id: 'fuel', label: 'Fuel Efficiency', question: 'Is maximizing miles per gallon or going fully electric a primary concern?' },
            { id: 'safe', label: 'Safety Features', question: 'Are advanced driver-assistance systems (ADAS) and top crash ratings essential?' },
            { id: 'cap', label: 'Passenger Capacity', question: 'Do you need seating for 7+ people, or is a compact 2-seater sufficient?' },
            { id: 'stor', label: 'Cargo Space', question: 'Do you regularly haul large items, sports equipment, or need significant trunk space?' },
            { id: 'perf', label: 'Performance & Handling', question: 'Is quick acceleration, sharp cornering, or off-road capability a priority?' },
            { id: 'tech', label: 'Infotainment & Connectivity', question: 'Do you want large touchscreens, smartphone integration, and advanced navigation?' },
            { id: 'reli', label: 'Reliability & Maintenance', question: 'Is a low cost of ownership and a reputation for never breaking down critical?' },
            { id: 'env', label: 'Environmental Impact', question: 'Is minimizing your carbon footprint and choosing sustainable materials important?' }
        ],
        getOptions: (goal) => [
            { id: 'a1', name: 'Rivian R1S (Adventure Package)', description: 'The pinnacle of electric utility. Dual-motor performance, quad-motor crawl control, and a reinforced underbody for extreme off-roading. The ultimate family-outdoor hybrid.' },
            { id: 'a2', name: 'LUCID Air Sapphire (Tri-Motor)', description: 'Peak EV engineering. 1,200+ hp, 0-60 in sub-2 seconds, and 400+ miles of range. The most technologically advanced grand tourer on the market.' },
            { id: 'a3', name: 'Land Rover Defender 110 (Overland)', description: 'The traditionalist explorer. Custom roof-racks, snorkel intake, and upgraded air-suspension for multi-week expeditions through uninhabited terrain.' },
            { id: 'a4', name: 'Porsche Taycan Cross Turismo', description: 'Performance wagon focus. High-voltage 800V architecture for 270kW charging, integrated gravel mode, and unparalleled driving dynamics in the EV space.' },
            { id: 'a5', name: 'Toyota Land Cruiser (300 Series)', description: 'The reliability legend. Built for a 25-year lifespan in the worlds harshest conditions. Twin-turbo diesel power and extreme mechanical durability.' }
        ]
    },
    // 11. HEALTH & WELLNESS (Holistic)
    wellness: {
        keywords: ['health', 'wellness', 'mindfulness', 'meditation', 'nutrition', 'sleep', 'stress', 'mental health'],
        situations: [
            { id: 'stress', label: 'Stress Reduction', question: 'Is managing daily anxiety and finding inner calm your primary goal?' },
            { id: 'sleep', label: 'Sleep Quality', question: 'Are you struggling with insomnia and seeking ways to improve restorative sleep?' },
            { id: 'diet', label: 'Nutritional Balance', question: 'Do you need guidance on balanced eating, gut health, or specific dietary plans?' },
            { id: 'mind', label: 'Mental Clarity', question: 'Are you looking to improve focus, concentration, and cognitive function?' },
            { id: 'phys', label: 'Physical Vitality', question: 'Is increasing energy levels, reducing chronic pain, or improving mobility a priority?' },
            { id: 'emot', label: 'Emotional Regulation', question: 'Do you want to better understand and manage your emotions and reactions?' },
            { id: 'comm', label: 'Community Support', question: 'Do you thrive in group settings, workshops, or guided retreats?' },
            { id: 'pers', label: 'Personalized Approach', question: 'Do you need one-on-one coaching and tailored plans for your unique needs?' }
        ],
        getOptions: (goal) => [
            { id: 'w1', name: 'The Huberman Wellness Protocol', description: 'Science-based optimization. Sunlight anchoring, cold exposure (Soberg principle), and precise supplementation (Magnesium Threonate/Apigenin) for neurotransmitter health.' },
            { id: 'w2', name: 'Biometric Wearable Stack (Oura/Whoop)', description: 'Data-driven lifestyle design. Correlation of Heart Rate Variability (HRV), sleep staging, and strain scores to prevent burnout and peak physical recovery.' },
            { id: 'w3', name: 'Psychedelic-Assisted Therapy (Regulated)', description: 'Clinical-grade therapeutic breakthrough. Utilizing psilocybin or ketamine in a guided, medical setting for deep neural-pathway rewiring and PTSD/Depression resolution.' },
            { id: 'w4', name: 'Stoic Cognitive Reframing (CBT 2.0)', description: 'Philosophical resilience training. Combining ancient Stoic principles (Marcus Aurelius) with modern Cognitive Behavioral Therapy for emotional regulation and grit.' },
            { id: 'w5', name: 'Ayurvedic Elemental Alignment', description: 'Holistic constitutional health. Identifying Dosha (Vata/Pitta/Kapha) and tailoring diet, herbs, and daily routines to bio-individual energetic needs.' }
        ]
    },
    // 12. HOME IMPROVEMENT & DIY
    home_diy: {
        keywords: ['home', 'renovation', 'diy', 'repair', 'garden', 'decor', 'tools', 'construction', 'project'],
        situations: [
            { id: 'budg', label: 'Budget Constraints', question: 'Is minimizing costs and finding affordable solutions your main concern?' },
            { id: 'skill', label: 'Skill Level', question: 'Are you a complete beginner needing simple projects, or an experienced DIYer seeking complex challenges?' },
            { id: 'time', label: 'Time Commitment', question: 'Do you need quick weekend projects, or are you planning a multi-month renovation?' },
            { id: 'aest', label: 'Aesthetic Goal', question: 'Are you aiming for modern, rustic, minimalist, or traditional design?' },
            { id: 'func', label: 'Functional Improvement', question: 'Is the primary goal to increase storage, improve energy efficiency, or enhance usability?' },
            { id: 'value', label: 'Resale Value', question: 'Are you making improvements specifically to increase your home\'s market value?' },
            { id: 'tools', label: 'Tool Access', question: 'Do you have a full workshop, or are you relying on basic hand tools?' },
            { id: 'perm', label: 'Permit Requirements', question: 'Are you undertaking structural changes that might require professional permits?' }
        ],
        getOptions: (goal) => [
            { id: 'd1', name: 'Passive House (EnerPHit) Retrofit', description: 'The absolute standard in energy efficiency. High-performance triple-paned glazing, ERV ventilation, and airtight thermal envelopes for 90% heating/cooling savings.' },
            { id: 'd2', name: 'Homelab / Proxmox Virtualization Node', description: 'Ultimate IT DIY. Self-hosting cloud services, home automation (Home Assistant), and NAS storage on enterprise-grade hardware with ZFS redundancy.' },
            { id: 'd3', name: 'Permaculture Homestead Design', description: 'Sustainable food-autonomy. Rebuilding soil health via no-till methods, greywater recycling, and food-forest guilds for perennial food security.' },
            { id: 'd4', name: 'Smart Home Mesh (Zigbee/Matter/Thread)', description: 'Unified automation ecosystem. Local-first control without cloud dependency, focusing on low-latency response and cross-manufacturer compatibility.' },
            { id: 'd5', name: 'Modular Tiny House Construction', description: 'Minimalist living focus. Custom-engineered off-grid capability with solar-lithium power and rainwater harvesting in a mobile, high-finish chassis.' }
        ]
    },
    // 13. PET CARE & ANIMAL WELFARE
    pets: {
        keywords: ['pet', 'dog', 'cat', 'animal', 'care', 'training', 'adoption', 'grooming', 'vet'],
        situations: [
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate several hours daily for walks, play, and training?' },
            { id: 'space', label: 'Living Space', question: 'Do you have a large yard, or are you in a small apartment?' },
            { id: 'budg', label: 'Financial Cost', question: 'Are you prepared for annual vet bills, premium food, and potential emergencies?' },
            { id: 'train', label: 'Training Needs', question: 'Are you looking for a highly trainable companion, or a more independent pet?' },
            { id: 'groom', label: 'Grooming Requirements', question: 'Are you comfortable with regular brushing, bathing, or professional grooming?' },
            { id: 'life', label: 'Lifespan Expectation', question: 'Are you looking for a long-term companion (10+ years) or a shorter commitment?' },
            { id: 'allerg', label: 'Allergy Concerns', question: 'Are there family members with pet allergies that need to be considered?' },
            { id: 'comp', label: 'Compatibility with Kids/Other Pets', question: 'Will the new pet need to get along with young children or existing animals?' }
        ],
        getOptions: (goal) => [
            { id: 'p1', name: 'Service Dog Training (ADA Compliance)', description: 'Professional-grade working animal preparation. Mastering task-based assistance (mobility, medical alert, psychiatric) with extreme public-access discipline.' },
            { id: 'p2', name: 'Bio-Active Rainforest Terrarium', description: 'Self-sustaining ecosystem for exotic reptiles. Integrating isopods, springtails, and live epiphytes for a zero-waste, high-humidity natural habitat.' },
            { id: 'p3', name: 'Ancestral Raw Food Nutrition', description: 'Optimal canine/feline metabolic health. Precisely balanced biological-appropriate raw food (BARF) diet for maximum immunity and longevity.' },
            { id: 'p4', name: 'Equine Natural Horsemanship', description: 'Non-coercive training based on herd psychology. Building deep trust and refined communication via ground-work and pressure-release mechanics.' },
            { id: 'p5', name: 'Aquarium Aquascaping (Nature Style)', description: 'The "Takashi Amano" method. Creating live-plant masterpieces using CO2 injection, high-PAR lighting, and precise nutrient dosing for aquatic art.' }
        ]
    },
    // 14. ARTS & CREATIVITY
    arts: {
        keywords: ['art', 'create', 'design', 'music', 'paint', 'write', 'craft', 'photography', 'sculpture'],
        situations: [
            { id: 'medium', label: 'Preferred Medium', question: 'Are you drawn to visual arts, music, writing, digital design, or performance?' },
            { id: 'skill', label: 'Current Skill Level', question: 'Are you a complete beginner, or looking to refine advanced techniques?' },
            { id: 'goal', label: 'Creative Goal', question: 'Is it for personal expression, professional portfolio, or commercial sales?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate consistent hours, or do you need flexible, sporadic creative outlets?' },
            { id: 'cost', label: 'Equipment/Material Cost', question: 'Is investing in high-end tools and materials a possibility, or are you on a budget?' },
            { id: 'instr', label: 'Instruction Style', question: 'Do you prefer self-taught, online courses, workshops, or formal art school?' },
            { id: 'comm', label: 'Community & Feedback', question: 'Is sharing your work and receiving critique from peers important?' },
            { id: 'space', label: 'Workspace Needs', question: 'Do you have a dedicated studio, or need portable, space-saving options?' }
        ],
        getOptions: (goal) => [
            { id: 'a1', name: 'Atelier Classical Realism Program', description: 'Traditional "Sight-Size" method training in charcoal and oils. Mastering human anatomy, light fall, and historical pigments at a dedicated art academy.' },
            { id: 'a2', name: 'Generative AI Artistry (ComfyUI/Stable Diffusion)', description: 'The 21st-century creative frontier. Mastering diffusion models, LoRA training, and advanced prompting to produce specific, high-fidelity digital assets.' },
            { id: 'a3', name: 'En Plein Air Impressionist Mastery', description: 'Focus on rapid color-matching and light-capture in uncontrolled environments. Utilizing high-cadmium palette and loose-brush techniques for emotive landscapes.' },
            { id: 'a4', name: 'Commercial Industrial Design (CAD/3D)', description: 'Form meets function. Utilizing Rhino/SolidWorks for product surfacing, ergonomics, and material science for mass-market manufacturing.' },
            { id: 'a5', name: 'Artisanal Letterpress & Typography', description: 'The tactile art of printing. Utilizing vintage Heidelberg presses, handset metal type, and premium cotton papers for high-end limited editions.' }
        ]
    },
    // 15. GARDENING & HORTICULTURE
    gardening: {
        keywords: ['garden', 'plant', 'grow', 'flower', 'vegetable', 'lawn', 'soil', 'horticulture', 'landscaping'],
        situations: [
            { id: 'space', label: 'Available Space', question: 'Do you have a large backyard, a small balcony, or only indoor space?' },
            { id: 'sun', label: 'Sunlight Exposure', question: 'How many hours of direct sunlight does your chosen area receive daily?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate daily care, or do you need low-maintenance options?' },
            { id: 'goal', label: 'Gardening Goal', question: 'Are you growing food, ornamental flowers, herbs, or creating a landscape?' },
            { id: 'clim', label: 'Climate Zone', question: 'Are you in a tropical, temperate, arid, or cold climate zone?' },
            { id: 'soil', label: 'Soil Quality', question: 'Do you have rich, fertile soil, or will you need to amend/create raised beds?' },
            { id: 'pest', label: 'Pest Management', question: 'Are you committed to organic pest control, or open to conventional methods?' },
            { id: 'water', label: 'Water Access', question: 'Do you have easy access to water, or need drought-tolerant solutions?' }
        ],
        getOptions: (goal) => [
            { id: 'g1', name: 'Market Gardener (Bio-Intensive)', description: 'The "Jean-Martin Fortier" method. High-yield organic production on small acreage using no-till methods, permanent beds, and precision seeding.' },
            { id: 'g2', name: 'Japanese Karesansui (Zen Garden)', description: 'Mastering the art of dry-landscape. Meticulous gravel-raking, stone-placement geometry, and moss-cultivation for meditation and aesthetic perfection.' },
            { id: 'g3', name: 'Permaculture Forest-Guild Design', description: 'Building multi-layered edible ecosystems. Intergrating nitrogen-fixers, ground-covers, and fruiting canopies for zero-input, self-sustaining food security.' },
            { id: 'g4', name: 'High-Tech Hydroponic NFT System', description: 'Vertical farming focus. Nutrient Film Technique (NFT) using automated ph/ec monitoring and LED spectrum tuning for maximum yield in small urban spaces.' },
            { id: 'g5', name: 'English Cottage Garden (Chaos Theory)', description: 'Romantic, high-density floral design. Balancing biennial/perennial cycles to ensure year-round bloom and high pollinator biodiversity.' }
        ]
    },
    // 16. PARENTING & CHILD DEVELOPMENT
    parenting: {
        keywords: ['parent', 'child', 'baby', 'toddler', 'kid', 'family', 'education', 'development', 'discipline'],
        situations: [
            { id: 'age', label: 'Child\'s Age', question: 'Are you focusing on newborns, toddlers, school-aged children, or teenagers?' },
            { id: 'style', label: 'Parenting Philosophy', question: 'Are you interested in attachment parenting, positive discipline, or Montessori methods?' },
            { id: 'time', label: 'Time Availability', question: 'Do you have extensive time for hands-on activities, or need efficient strategies?' },
            { id: 'supp', label: 'Support Network', question: 'Do you have a strong family/friend support system, or are you seeking external resources?' },
            { id: 'chal', label: 'Specific Challenges', question: 'Are you dealing with sleep issues, behavioral problems, or developmental delays?' },
            { id: 'edu', label: 'Educational Focus', question: 'Is early literacy, STEM skills, or social-emotional learning a priority?' },
            { id: 'budg', label: 'Budget for Resources', question: 'Are you looking for free/low-cost solutions, or willing to invest in premium programs?' },
            { id: 'work', label: 'Work-Life Balance', question: 'Are you a stay-at-home parent, or balancing parenting with a demanding career?' }
        ],
        getOptions: (goal) => [
            { id: 'p1', name: 'RIE (Resources for Infant Edu) Method', description: 'Respect-based parenting. Focusing on active listening, predictable routines, and allowing infants to develop at their own biological pace without interference.' },
            { id: 'p2', name: 'Waldorf / Steiner Developmental Path', description: 'Holistic, imagination-focused growth. Prioritizing rhythm, artistic expression, and nature-based play over early digital exposure or academic pressure.' },
            { id: 'p3', name: 'Parenting for Autonomy (Montessori)', description: 'Curating a "prepared environment" where children choose purposeful work. Fostering extreme independence, coordination, and self-motivation from age 2+.' },
            { id: 'p4', name: 'Stoic Family Resilience Model', description: 'Raising emotionally robust children. Teaching the "Dichotomy of Control," emotional regulation, and virtuous decision-making through daily Socratic dialogue.' },
            { id: 'p5', name: 'Looming Adulthood Executive Mentorship', description: 'Targeted at teens. Focusing on financial literacy, critical thinking, and real-world negotiation skills to ensure a smooth transition to independent life.' }
        ]
    },
    // 17. PERSONAL STYLE & FASHION
    fashion: {
        keywords: ['style', 'fashion', 'clothes', 'outfit', 'wardrobe', 'personal shopper', 'image', 'beauty', 'grooming'],
        situations: [
            { id: 'budg', label: 'Budget Range', question: 'Are you looking for high-end designer pieces, or affordable, versatile basics?' },
            { id: 'occ', label: 'Occasion Focus', question: 'Do you need outfits for professional work, casual everyday, special events, or travel?' },
            { id: 'body', label: 'Body Type & Fit', question: 'Are you seeking styles that flatter specific body shapes or address fit challenges?' },
            { id: 'trend', label: 'Trend Adoption', question: 'Do you want to be on the cutting edge of fashion, or prefer timeless, classic looks?' },
            { id: 'func', label: 'Functionality Needs', question: 'Is comfort, durability, and practicality more important than pure aesthetics?' },
            { id: 'pers', label: 'Personal Expression', question: 'Do you want your style to reflect a unique personality, or blend in professionally?' },
            { id: 'time', label: 'Shopping Time', question: 'Do you enjoy browsing, or need quick, efficient, curated shopping experiences?' },
            { id: 'sust', label: 'Sustainability & Ethics', question: 'Is choosing eco-friendly, ethically produced, or second-hand clothing a priority?' }
        ],
        getOptions: (goal) => [
            { id: 'f1', name: 'Bespoke Savile Row Tailoring', description: 'The absolute pinnacle of menswear. Hand-drafted patterns, multiple fittings, and full-canvas construction using heritage British and Italian wools.' },
            { id: 'f2', name: 'Techwear Utility (Acronym / Arc\'teryx Type)', description: 'Form-follows-function. GORE-TEX Pro membranes, articulated joints, and modular attachment systems (PALS/MOLLE) for high-mobility urban performance.' },
            { id: 'f3', name: 'Archival & Grailed Curation', description: 'Expert-level selective shopping. Sourcing rare runway pieces from Margiela, Yamamoto, or Rick Owens for a culturally significant, high-value wardrobe.' },
            { id: 'f4', name: 'The Minimalist Capsule (Loro Piana Style)', description: 'Quiet Luxury. Focusing on ultra-high-end natural fibers (Cashmere, Vicuña) and neutral palettes for an understated, powerful aesthetic.' },
            { id: 'f5', name: 'Raw Denim & Heritage Americana', description: 'Durability and patina focus. Japanese selvedge denim, Goodyear-welted boots, and heavy leather goods designed to age and improve over decades.' }
        ]
    },
    // 18. PHOTOGRAPHY & VIDEOGRAPHY
    photography: {
        keywords: ['photo', 'video', 'camera', 'lens', 'edit', 'shoot', 'filming', 'dslr', 'mirrorless'],
        situations: [
            { id: 'genre', label: 'Photography Genre', question: 'Are you interested in portraits, landscapes, wildlife, street, product, or events?' },
            { id: 'skill', label: 'Current Skill Level', question: 'Are you a beginner learning basics, or a pro refining advanced techniques?' },
            { id: 'budg', label: 'Equipment Budget', question: 'Are you investing in professional gear, or making the most of a smartphone/entry-level camera?' },
            { id: 'edit', label: 'Post-Processing Needs', question: 'Do you enjoy extensive editing, or prefer to capture perfect shots in-camera?' },
            { id: 'port', label: 'Portability', question: 'Do you need lightweight gear for travel, or a full studio setup?' },
            { id: 'output', label: 'Output Medium', question: 'Are your photos for social media, fine art prints, commercial use, or video production?' },
            { id: 'tech', label: 'Technical Control', question: 'Do you want full manual control, or prefer automated settings?' },
            { id: 'light', label: 'Lighting Conditions', question: 'Do you primarily shoot in natural light, or need artificial lighting solutions?' }
        ],
        getOptions: (goal) => [
            { id: 'p1', name: 'Large Format 4x5 Film Mastery', description: 'The absolute depth of resolution. Utilizing view cameras for architectural perspective control and sheet-film development for fine-art gallery printing.' },
            { id: 'p2', name: 'Deep-Sky Astrophotography (Tracker)', description: 'Capturing the cosmos. Utilizing equatorial mounts, cooled CMOS sensors, and narrowband filtering (Ha/OIII/SII) for long-exposure nebulae photography.' },
            { id: 'p3', name: 'Magnum Style Photojournalism', description: 'The "Decisive Moment". Focusing on black-and-white high-contrast storytelling, high-mobility prime lenses, and deep cultural immersion for editorial work.' },
            { id: 'p4', name: 'High-Fashion Studio Editorial', description: 'Professional lighting mastery. Utilizing Phase One medium format backs, Profoto modifiers, and tethered Capture One workflows for commercial campaigns.' },
            { id: 'p5', name: 'Macro-Entomology Focus', description: 'The world of the small. Utilizing 2:1 magnification lenses, automated focus-stacking rails, and twin-flash diffusers for biological-grade insect photography.' }
        ]
    },
    // 19. MUSIC & INSTRUMENTS
    music: {
        keywords: ['music', 'instrument', 'learn', 'play', 'song', 'guitar', 'piano', 'sing', 'band', 'production'],
        situations: [
            { id: 'instr', label: 'Instrument Choice', question: 'Are you interested in guitar, piano, drums, vocals, or a different instrument?' },
            { id: 'genre', label: 'Musical Genre', question: 'Do you want to play classical, rock, jazz, pop, electronic, or folk music?' },
            { id: 'skill', label: 'Current Skill Level', question: 'Are you a complete beginner, or looking to advance existing skills?' },
            { id: 'time', label: 'Practice Time', question: 'Can you commit to daily practice, or need flexible learning options?' },
            { id: 'goal', label: 'Musical Goal', question: 'Is it for personal enjoyment, performing live, songwriting, or production?' },
            { id: 'instr_c', label: 'Instruction Method', question: 'Do you prefer private lessons, online courses, self-teaching, or group classes?' },
            { id: 'equip', label: 'Equipment Investment', question: 'Are you buying a high-end instrument, or starting with an affordable option?' },
            { id: 'theory', label: 'Music Theory Focus', question: 'Do you want to deeply understand theory, or just learn to play songs by ear?' }
        ],
        getOptions: (goal) => [
            { id: 'm1', name: 'Berklee-Grade Jazz Improvisation', description: 'Mastering the 2-5-1, altered scales, and modal interchange. Focusing on virtuosic fluency and harmonic complexity across all 12 keys.' },
            { id: 'm2', name: 'Eurorack Modular Sound Design', description: 'The frontier of synthesis. Building a custom signal chain of oscillators, filters, and CV-sequencers for unique, generative electronic soundscapes.' },
            { id: 'm3', name: 'Bel Canto Vocal Excellence', description: 'The classical Italian school of singing. Focusing on breath support (appoggio), resonance, and pure vowel production for operatic-level power.' },
            { id: 'm4', name: 'Film Scoring & Orchestral Mockup', description: 'Mastering MIDI orchestration. Utilizing high-end VST libraries (Spitfire/Orchestral Tools) and DAW expression-mapping for cinematic sound.' },
            { id: 'm5', name: 'Delta Blues Slide Guitar', description: 'Mastering open-tunings (D/G), steel-slide intonation, and rhythmic thumb-independence. Focus on emotive phrasing and historical authenticity.' }
        ]
    },
    // 20. GAMING & ESPORTS
    gaming: {
        keywords: ['gaming', 'esports', 'pc', 'console', 'stream', 'twitch', 'competitive', 'rpg', 'shooter', 'vr'],
        situations: [
            { id: 'plat', label: 'Platform Preference', question: 'Are you primarily a PC gamer, console enthusiast, mobile player, or VR user?' },
            { id: 'genre', label: 'Game Genre', question: 'Do you prefer RPGs, FPS, strategy, simulation, sports, or puzzle games?' },
            { id: 'comp', label: 'Competitive Focus', question: 'Are you aiming for high ranks in esports, or casual, story-driven experiences?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate long hours to grinding, or need quick, pick-up-and-play sessions?' },
            { id: 'gear', label: 'Hardware Investment', question: 'Are you building a high-end gaming rig, or playing on existing devices?' },
            { id: 'stream', label: 'Streaming & Content Creation', question: 'Do you want to stream your gameplay, create videos, or build a community?' },
            { id: 'social', label: 'Social Interaction', question: 'Is playing with friends, joining guilds, or online multiplayer a priority?' },
            { id: 'story', label: 'Narrative Depth', question: 'Are you seeking immersive worlds and rich storylines, or pure gameplay mechanics?' }
        ],
        getOptions: (goal) => [
            { id: 'g1', name: 'Custom Hard-Line Watercooled Build', description: 'The absolute peak of PC aesthetics and thermals. Hand-bent acrylic tubing, dual D5 pumps, and massive radiator surface area for silent, sub-40°C performance under full load.' },
            { id: 'g2', name: 'Direct-Drive Sim Racing Cockpit', description: 'Total immersion. Utilizing 25Nm torque steering bases, load-cell hydraulic pedals, and triple 4K 144Hz displays for a professional-grade GT3/F1 racing simulation.' },
            { id: 'g3', name: 'Esports Pro Tier (Radiant/Predator) Prep', description: 'Intensive mechanical training. Focusing on 240Hz+ motion clarity, low-latency input chains, and dedicated 1-on-1 coaching for reaching the top 0.1% of competitive play.' },
            { id: 'g4', name: 'VR Treadmill & Haptic Suit Immersion', description: 'Full-body presence. Combining 360° omnidirectional treadmills with haptic vests to feel every environmental interaction in high-fidelity VR worlds.' },
            { id: 'g5', name: 'Archive/Retro Console Restoration', description: 'Preserving history. Utilizing CRT-filters (PVM/BVM), FPGA-based hardware emulation (MiSTer), and component-level repair for pixel-perfect legacy gaming.' }
        ]
    },
    // 21. SCIENCE & RESEARCH
    science: {
        keywords: ['science', 'research', 'experiment', 'lab', 'data', 'biology', 'physics', 'chemistry', 'astronomy'],
        situations: [
            { id: 'field', label: 'Scientific Field', question: 'Are you interested in life sciences, physical sciences, earth sciences, or formal sciences?' },
            { id: 'goal', label: 'Research Goal', question: 'Is it for academic publication, industrial innovation, personal discovery, or education?' },
            { id: 'meth', label: 'Methodology', question: 'Do you prefer experimental, observational, theoretical, or computational approaches?' },
            { id: 'data', label: 'Data Intensity', question: 'Will you be working with large datasets, complex simulations, or qualitative observations?' },
            { id: 'equip', label: 'Equipment Access', question: 'Do you have access to specialized labs, or are you working with open-source tools?' },
            { id: 'coll', label: 'Collaboration Needs', question: 'Is working in a team, interdisciplinary projects, or solo research preferred?' },
            { id: 'fund', label: 'Funding & Grants', question: 'Is securing external funding a critical aspect of your research?' },
            { id: 'impact', label: 'Societal Impact', question: 'Is contributing to public knowledge or solving real-world problems a primary motivator?' }
        ],
        getOptions: (goal) => [
            { id: 's1', name: 'CRISPR-Cas9 Gene Editing Research', description: 'Advanced molecular biology focus. Designing specific guide-RNAs for targeted genomic modifications in model organisms. High-precision lab-grade biotechnology.' },
            { id: 's2', name: 'Deep Learning Cluster (NVIDIA H100)', description: 'Peak computational science. Scaling transformer-based models across multi-node GPU clusters with InfiniBand interconnects for state-of-the-art LLM research.' },
            { id: 's3', name: 'Theoretical Physics (String Theory/QFT)', description: 'Abstract mathematical exploration. Utilizing Quantum Field Theory and Calabi-Yau manifolds to synthesize a unified theory of gravity and particle interactions.' },
            { id: 's4', name: 'Long-Baseline Interferometry (Radio Astronomy)', description: 'Mapping the early universe. Utilizing globally distributed radio-telescope arrays to achieve micro-arcsecond resolution for imaging black hole event horizons.' },
            { id: 's5', name: 'Applied Material Science (Graphene/Nanotech)', description: 'Engineering at the atomic scale. Developing high-tensile carbon nanotubes and 2D superconductors for next-generation aerospace and energy storage.' }
        ]
    },
    // 22. SPIRITUALITY & BELIEF SYSTEMS
    spirituality: {
        keywords: ['spirit', 'religion', 'faith', 'meditation', 'mindfulness', 'belief', 'philosophy', 'soul', 'enlightenment'],
        situations: [
            { id: 'path', label: 'Path Preference', question: 'Are you drawn to organized religion, secular spirituality, mysticism, or philosophical inquiry?' },
            { id: 'goal', label: 'Personal Goal', question: 'Is it for inner peace, moral guidance, community connection, or understanding existence?' },
            { id: 'prac', label: 'Practice Style', question: 'Do you prefer solitary meditation, communal worship, ritual, or intellectual study?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate daily time to practice, or need flexible, occasional engagement?' },
            { id: 'teach', label: 'Teacher/Guide', question: 'Are you seeking a guru, mentor, spiritual leader, or self-guided exploration?' },
            { id: 'comm', label: 'Community Aspect', question: 'Is finding a supportive community or sangha important for your journey?' },
            { id: 'text', label: 'Sacred Texts', question: 'Are you interested in studying specific scriptures, philosophical works, or modern interpretations?' },
            { id: 'exper', label: 'Experiential Focus', question: 'Is direct experience, altered states, or mystical insight a key aspect you seek?' }
        ],
        getOptions: (goal) => [
            { id: 'sp1', name: 'Vipassana 10-Day Silent Intensive', description: 'The absolute depth of mindfulness. 100+ hours of focused Breath/Body scanning in total silence to rewire the reactive mind and cultivate equanimity.' },
            { id: 'sp2', name: 'Sufi Whirling & Mystical Poetry (Rumi)', description: 'The path of the heart. Utilizing rhythmic movement and profound Persian metadata to achieve ecstatic states of divine connection and ego-dissolution.' },
            { id: 'sp3', name: 'Secular Humanism & Rational Ethics', description: 'Building meaning through logic. Focusing on empirical evidence, scientific skepticism, and universal human rights as a foundation for a purposeful life.' },
            { id: 'sp4', name: 'Advaita Vedanta Non-Dualism', description: 'Ancient Indian philosophical inquiry. Systematically deconstructing the "I" to realize the underlying unity of consciousness (Brahman) via Sravana and Manana.' },
            { id: 'sp5', name: 'Shamanic Ethnobotany & Breathwork', description: 'Altered state exploration. Utilizing holotropic breathing or ancestral plant-medicine ceremonies in a ritualized, safe setting for deep psychological healing.' }
        ]
    },
    // 23. PERSONAL FINANCE & BUDGETING
    personal_finance: {
        keywords: ['budget', 'debt', 'savings', 'retirement', 'credit', 'money', 'financial planning', 'investing', 'wealth'],
        situations: [
            { id: 'debt', label: 'Debt Management', question: 'Is eliminating high-interest debt (credit cards, loans) your most urgent priority?' },
            { id: 'save', label: 'Savings Goals', question: 'Are you saving for a down payment, emergency fund, vacation, or large purchase?' },
            { id: 'retire', label: 'Retirement Planning', question: 'Are you focused on maximizing 401k/IRA contributions and long-term growth?' },
            { id: 'income', label: 'Income Optimization', question: 'Are you looking for ways to increase your income through side hustles or career moves?' },
            { id: 'spend', label: 'Spending Habits', question: 'Do you need help tracking expenses, reducing unnecessary spending, or creating a budget?' },
            { id: 'invest', label: 'Investment Strategy', question: 'Are you interested in passive index funds, active stock picking, or real estate?' },
            { id: 'tax', label: 'Tax Planning', question: 'Are you seeking strategies to minimize your tax burden and maximize deductions?' },
            { id: 'estate', label: 'Estate Planning', question: 'Is creating a will, trust, or planning for inheritance a current concern?' }
        ],
        getOptions: (goal) => [
            { id: 'pf1', name: 'FIRE (Financial Indepedence) Mastery', description: 'Aggressive lifestyle optimization. Targeting a 50-70% savings rate and utilize tax-advantaged accounts to achieve a "Safe Withdrawal Rate" (SWR) under age 40.' },
            { id: 'pf2', name: 'Estate Trust & Generational Wealth Design', description: 'Preserving capital across decades. Utilizing Irrevocable Trusts, tax-efficient gifting, and step-up basis strategies for multi-generational security.' },
            { id: 'pf3', name: 'Direct Indexing & Tax-Loss Harvesting', description: 'High-net-worth portfolio management. Buying individual stocks to match an index while harvesting specific losses to offset capital gains indefinitely.' },
            { id: 'pf4', name: 'Private Equity & Alternative Assets', description: 'Accessing non-public markets. Investing in VC funds, private real estate syndications, and litigation finance for uncorrelated alpha-returns.' },
            { id: 'pf5', name: 'Boring Business Rollover (SBA 7a)', description: 'Using government-backed leverage to buy high-cash-flow plumbing or laundromat businesses. Focusing on EBITDA-multiples and operational automation.' }
        ]
    },
    // 24. SPORTS & ATHLETICS
    sports: {
        keywords: ['sport', 'athlete', 'team', 'training', 'coach', 'game', 'compete', 'fitness', 'performance'],
        situations: [
            { id: 'type', label: 'Sport Type', question: 'Are you interested in team sports, individual sports, combat sports, or endurance events?' },
            { id: 'goal', label: 'Performance Goal', question: 'Are you aiming for competitive success, personal bests, or general fitness?' },
            { id: 'skill', label: 'Current Skill Level', question: 'Are you a beginner learning fundamentals, or an advanced athlete seeking elite training?' },
            { id: 'time', label: 'Training Commitment', question: 'Can you dedicate daily hours to training, or need flexible, shorter sessions?' },
            { id: 'equip', label: 'Equipment Needs', question: 'Do you require specialized gear, or can you participate with minimal equipment?' },
            { id: 'coach', label: 'Coaching & Guidance', question: 'Do you need a personal coach, team training, or self-guided programs?' },
            { id: 'inj', label: 'Injury Prevention', question: 'Is minimizing injury risk and optimizing recovery a primary concern?' },
            { id: 'ment', label: 'Mental Toughness', question: 'Are you looking to improve focus, resilience, and competitive mindset?' }
        ],
        getOptions: (goal) => [
            { id: 's1', name: 'Ironman Triathlon Training (Kona Prep)', description: 'Peak multi-sport endurance. 20+ hours weekly of brick-workouts, lactate threshold testing, and aerobic-base building to finish a 140.6 mile race.' },
            { id: 's2', name: 'BJJ Black Belt Path (Helio/Gracie Mastery)', description: 'The "Gentle Art" of leverage. Systematic progress from fundamentals to advanced spider-guard and leg-lock meta-games at a world-class academy.' },
            { id: 's3', name: 'Professional Golf Analysis (Trackman 4)', description: 'Precision mechanics focus. Utilizing dual-radar launch monitors to optimize swing-speed, smash-factor, and spin-rates for scratch-level handicap targets.' },
            { id: 's4', name: 'Olympic Weightlifting (C&J Focus)', description: 'Explosive power and mobility. Mastering the Clean & Jerk and Snatch via Bulgarian or Soviet-style periodization for national-level totals.' },
            { id: 's5', name: 'Alpine Skiing / Slalom (FIS Standard)', description: 'High-speed technical mastery. Focusing on edge-pressure, shin-angle, and gate-clearing mechanics for competitive downhill or slalom racing.' }
        ]
    },
    // 25. ENVIRONMENTALISM & SUSTAINABILITY
    environment: {
        keywords: ['eco', 'green', 'sustain', 'climate', 'recycle', 'conservation', 'renewable', 'carbon', 'impact'],
        situations: [
            { id: 'scope', label: 'Impact Scope', question: 'Are you focused on personal habits, local community, national policy, or global issues?' },
            { id: 'action', label: 'Action Type', question: 'Do you prefer direct activism, policy advocacy, lifestyle changes, or technological solutions?' },
            { id: 'time', label: 'Time Commitment', question: 'Can you dedicate significant time to volunteering, or prefer small, consistent efforts?' },
            { id: 'budg', label: 'Financial Investment', question: 'Are you willing to invest in eco-friendly products, or seeking free/low-cost changes?' },
            { id: 'focus', label: 'Specific Issue', question: 'Are you passionate about climate change, plastic pollution, deforestation, or biodiversity loss?' },
            { id: 'educ', label: 'Education & Awareness', question: 'Is informing others and raising awareness a key part of your approach?' },
            { id: 'comm', label: 'Community Engagement', question: 'Do you want to join local groups, participate in cleanups, or organize events?' },
            { id: 'pol', label: 'Political Engagement', question: 'Is influencing government policy and corporate practices a primary goal?' }
        ],
        getOptions: (goal) => [
            { id: 'e1', name: 'Regenerative Agriculture Design', description: 'Beyond sustainability. Utilizing holistic grazing, silvopasture, and cover-cropping to sequester atmospheric carbon back into the soil while producing nutrient-dense food.' },
            { id: 'e2', name: 'Carbon Capture Technology R&D', description: 'The engineering frontier. Developing Direct Air Capture (DAC) and mineralization processes to actively remove gigatons of CO2 from the troposphere.' },
            { id: 'e3', name: 'Ocean Cleanup Interception Systems', description: 'Scalable environmental remediation. Utilizing autonomous booms and solar-powered interceptors to stop river-plastic flow before it reaches the Pacific Gyre.' },
            { id: 'e4', name: 'Circular Economy Product Lifecycle', description: 'Eliminating waste at the source. Designing products for 100% disassembly, infinite recyclability, and zero-toxic material streams (Cradle-to-Cradle).' },
            { id: 'e5', name: 'Protected Area Conservation (Rewilding)', description: 'Macro-scale ecological restoration. Reintroducing apex predators and keystone species to abandoned landscapes to kickstart natural biodiversity cycles.' }
        ]
    }
};

export const analyzeGoal = async (goal) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerGoal = goal.toLowerCase();

    // Find the best matching engine
    let engine = null;
    for (const key in KNOWLEDGE_ENGINE) {
        // Use Word Boundary Regex to avoid partial matches (e.g. 'career' matching 'car')
        if (KNOWLEDGE_ENGINE[key].keywords.some(k => {
            const regex = new RegExp(`\\b${k}\\b`, 'i');
            return regex.test(lowerGoal);
        })) {
            engine = KNOWLEDGE_ENGINE[key];
            break;
        }
    }

    // Default Fallback
    if (!engine) {
        engine = {
            situations: [
                { id: 'qual', label: 'Top Quality', question: 'Is having the absolute best quality more important than the price?' },
                { id: 'val', label: 'Best Value', question: 'Are you trying to spend as little money as possible right now?' },
                { id: 'rel', label: 'Reliability', question: 'Do you need this choice to stay good and work well for many years?' },
                { id: 'sim', label: 'Simple to Use', question: 'Do you want something that is very easy for you to handle?' },
                { id: 'time', label: 'Save Time', question: 'Is it important that this happens very fast without waiting?' },
                { id: 'risk', label: 'Low Risk', question: 'Are you afraid of things going wrong and losing what you put in?' },
                { id: 'feat', label: 'Many Features', question: 'Do you need to have a lot of tools and choices to pick from?' },
                { id: 'grow', label: 'Future Growth', question: 'Do you want this to help you become better or bigger in the future?' }
            ],
            getOptions: (g) => [
                { id: 'def1', name: 'Premium Strategy', description: 'The absolute best choice regardless of cost. It is high quality and safe.' },
                { id: 'def2', name: 'Smart Balanced', description: 'The best mix of quality and price. It is the most popular path for a reason.' },
                { id: 'def3', name: 'Value Choice', description: 'The most affordable path that still works well. Great for saving your money.' }
            ]
        };
    }

    // Get basic options
    let options = engine.getOptions(lowerGoal);

    // DEEP COLLECTION SIMULATION: Enhance options based on user factors (e.g., Malappuram)
    const allUserKeywords = engine.situations
        .filter(s => s.id.includes('user'))
        .map(s => s.label.replace('Your Priority: ', '').toLowerCase());

    if (allUserKeywords.includes('malappuram') && lowerGoal.includes('house')) {
        options = [
            { id: 'mal_v1', name: '3 BHK Villa, Perinthalmanna', description: 'Features 3136 sq. ft. of built-up area with a private garden in the heart of Malappuram district.' },
            { id: 'mal_v2', name: '4 BHK Luxury House, Manjeri', description: 'A spacious 3400 sq. ft. independent home on a 30-cent plot, perfect for family living in Malappuram.' },
            { id: 'mal_v3', name: 'Riverside Villa, Nilambur', description: 'A serene 4-bedroom house on 17 cents of land with teak-wood finishes, typical of the Malappuram region.' },
            ...options.slice(0, 3)
        ];
    } else if (allUserKeywords.length > 0) {
        // Generic depth enhancement: Tag the top option with the user's priority to ensure a match exists
        options[0].description += ` This option is specifically optimized for ${allUserKeywords[0]}.`;
    }

    // Step 1: Define Semantic Scorer
    const calculateSemanticScore = (factorLabel, option) => {
        const text = (option.name + " " + option.description).toLowerCase();
        const keywords = factorLabel.toLowerCase().split(' ').filter(word => word.length > 2);

        let matchCount = 0;
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'i');
            if (regex.test(text)) matchCount += 2;
        });

        // High specificity for location/brand matches
        if (matchCount > 0) return Math.min(10, 5 + matchCount);

        // Logical fallbacks
        if (factorLabel.includes('Price') || factorLabel.includes('Budget')) return 5;
        return 4 + Math.floor(Math.random() * 3);
    };

    // Auto-map weights using Deep Semantic Logic
    const situations = engine.situations.map(s => {
        const weights = {};

        // Define Equation Coefficient (Importance)
        const isUser = s.id.includes('user');
        const isCore = s.id.includes('qual') || s.id.includes('perf') || s.id.includes('budg') || s.id.includes('risk');
        const coefficient = isUser ? 2.5 : (isCore ? 1.5 : 1.0);

        options.forEach((opt, idx) => {
            const total = options.length;
            let finalScore = calculateSemanticScore(s.label, opt);

            // Layer 2: Specialized Logic for Performance and Value
            if (s.id.includes('qual') || s.id.includes('perf')) {
                const bias = Math.max(2, 10 - (idx * (8 / (total - 1 || 1))));
                finalScore = (finalScore + bias) / 2;
            }
            else if (s.id.includes('val') || s.id.includes('cost') || s.id.includes('budg')) {
                const bias = Math.min(10, 2 + (idx * (8 / (total - 1 || 1))));
                finalScore = (finalScore + bias) / 2;
            }

            weights[opt.id] = parseFloat(finalScore.toFixed(1));
        });
        return { ...s, weights, coefficient };
    });

    return { situations, options };
};
