import React, { useState, useEffect, useRef } from 'react';
import { evaluateOptions } from '../utils/DecisionEngine';
import { analyzeGoal } from '../utils/AIService';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your AI Situational Companion. Tell me, what's a major decision or case you're analyzing? (e.g., 'Buying a car', 'Buying a laptop', 'Choosing a career', 'Buying a house', 'Choosing a college')" }
    ]);
    const [currentStep, setCurrentStep] = useState('goal'); // 'goal', 'factor', 'analyzing', 'listing', 'questions', 'completed'
    const [userInput, setUserInput] = useState('');
    const [userFactors, setUserFactors] = useState([]);
    const [decisionData, setDecisionData] = useState({ situations: [], options: [] });
    const [situationIndex, setSituationIndex] = useState(0);
    const [userRatings, setUserRatings] = useState({});
    const [results, setResults] = useState(null);
    const [analysisLogs, setAnalysisLogs] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isProcessing]);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const handleGoalSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const goal = userInput;
        addMessage('user', goal);
        setUserInput('');
        setCurrentStep('factor');
        addMessage('bot', "What is a key factor or criterion for you in this decision? (e.g., 'Budget', 'Durability', 'Brand Prestige')");
    };

    const handleFactorSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const factors = userInput.split(',').map(f => f.trim()).filter(f => f !== '');
        setUserFactors(factors);
        addMessage('user', userInput);
        setUserInput('');
        setCurrentStep('analyzing');
        setIsProcessing(true);

        try {
            // GROQ AI (Llama 3.3 70B) SEARCH
            const logs = [
                "Connecting to Groq LLM (Llama 3.3 70B)...",
                "Analyzing semantic intent of your goal...",
                "Generating dynamic situational factors...",
                "Sourcing real-world expert options...",
                "Constructing multi-dimensional decision matrix...",
                "Synthesizing linear equation coefficients..."
            ];

            for (let i = 0; i < logs.length; i++) {
                setAnalysisLogs(prev => [...prev, logs[i]]);
                await new Promise(resolve => setTimeout(resolve, 600));
            }

            const data = await analyzeGoal(messages.find(m => m.role === 'user')?.text || '');

            if (data.mode === 'FALLBACK') {
                setIsProcessing(false);
                setAnalysisLogs([]);
                const errorMsg = `⚠️ **AI Analysis Not Available**\n\nPlease set up your Groq API key in the .env file:\n\nVITE_GROQ_API_KEY=your_key_here\n\nGet a free key (14,400 req/day) at:\nhttps://console.groq.com`;
                addMessage('bot', errorMsg);
                setCurrentStep('goal');
                return;
            }

            // Deep Semantic Evaluation for User Factors
            const calculateUserFactorScore = (factor, option) => {
                const text = (option.name + " " + option.description).toLowerCase();
                const keywords = factor.toLowerCase().split(' ').filter(word => word.length > 2);
                const match = keywords.some(kw => text.includes(kw));
                return match ? 9.5 : 4.5; // High signal for explicit keyword match
            };

            const customSituations = factors.map((f, i) => {
                const weights = {};
                data.options.forEach(opt => {
                    weights[opt.id] = calculateUserFactorScore(f, opt);
                });

                // Generate a contextual question
                let contextualQuestion = `On a scale of 2-10, how strictly must the choice align with your priority: "${f}"?`;
                const fl = f.toLowerCase();
                if (fl.includes('malappuram') || fl.includes('place') || fl.includes('location')) {
                    contextualQuestion = `How critical is it that the house is specifically located in "${f}"? (2: Flexible, 10: Mandatory)`;
                } else if (fl.includes('budget') || fl.includes('cost') || fl.includes('price')) {
                    contextualQuestion = `How strictly do you need to stick to your "${f}" target? (2: Loose, 10: Strict)`;
                }

                return {
                    id: `user_custom_${i}`,
                    label: f,
                    question: contextualQuestion,
                    weights,
                    coefficient: 2.5
                };
            });

            const mergedSituations = [
                ...customSituations,
                // Deduplicate: skip AI factors that overlap with user-defined ones
                ...data.situations.filter(aiSit => {
                    const aiLabel = aiSit.label.toLowerCase();
                    return !customSituations.some(userSit => {
                        const userLabel = userSit.label.toLowerCase();
                        // Check if either label contains key words from the other
                        const userWords = userLabel.split(' ').filter(w => w.length > 3);
                        return userWords.some(word => aiLabel.includes(word)) || aiLabel === userLabel;
                    });
                })
            ];
            setDecisionData({ ...data, situations: mergedSituations });

            setIsProcessing(false);
            setAnalysisLogs([]);

            // Factor Listing Phase (Embedded in Chat)
            const factorList = mergedSituations.map((s, i) => `${i + 1}. ${s.label}`).join('\n');

            addMessage('bot', `**AI ANALYSIS COMPLETE**\n\nI've identified ${mergedSituations.length} situational factors for your case:\n\n${factorList}`);

            setCurrentStep('ready');
        } catch (error) {
            setIsProcessing(false);
            setAnalysisLogs([]);
            const isKeyMissing = error.message === 'GROQ_API_KEY_MISSING';
            const errorMsg = isKeyMissing
                ? `⚠️ **Groq API Key Missing**\n\nAdd to your .env file:\nVITE_GROQ_API_KEY=your_key_here\n\nFree key (14,400 req/day): https://console.groq.com`
                : `❌ AI Error: ${error.message}`;
            addMessage('bot', errorMsg);
            setCurrentStep('goal');
        }
    };

    const startAssessment = () => {
        addMessage('bot', "Let's personalize the analysis. I'll ask you to rate the relevance of each factor on a scale of 1-10.");
        setTimeout(() => {
            askNextQuestion(0, decisionData.situations);
        }, 500);
    };

    const askNextQuestion = (index, situations) => {
        if (index < situations.length) {
            setCurrentStep('questions');
            setSituationIndex(index);
            addMessage('bot', situations[index].question);
        } else {
            finalizeDecision();
        }
    };

    const handleRating = (value) => {
        const currentSit = decisionData.situations[situationIndex];
        addMessage('user', `Relevance: ${value}/10`);

        const newRatings = { ...userRatings, [currentSit.id]: value };
        setUserRatings(newRatings);

        setTimeout(() => {
            if (situationIndex + 1 < decisionData.situations.length) {
                askNextQuestion(situationIndex + 1, decisionData.situations);
            } else {
                finalizeDecision(newRatings);
            }
        }, 600);
    };

    const finalizeDecision = (finalRatings = userRatings) => {
        setIsProcessing(true);
        setCurrentStep('completed');

        setTimeout(() => {
            const evaluated = evaluateOptions(decisionData.options, decisionData.situations, finalRatings);
            addMessage('bot', "Analysis complete. Based on the specific situations you've confirmed, here is the best match for your case.");
            setResults(evaluated);
            setIsProcessing(false);
        }, 1000);
    };

    const renderInputArea = () => {
        if (currentStep === 'goal' || currentStep === 'factor') {
            return (
                <form onSubmit={currentStep === 'goal' ? handleGoalSubmit : handleFactorSubmit} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={currentStep === 'goal' ? "Describe your case..." : "Enter your priority factor..."}
                        className="input-field"
                        style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>Analyze</button>
                </form>
            );
        }

        if (currentStep === 'ready') {
            return (
                <button onClick={startAssessment} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    Start Personalized Assessment
                </button>
            );
        }

        if (currentStep === 'questions') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                    {[2, 4, 6, 8, 10].map(val => (
                        <button key={val} onClick={() => handleRating(val)} className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>{val}</button>
                    ))}
                </div>
            );
        }

        if (currentStep === 'completed' && results) {
            return (
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ width: '100%' }}>
                    Start New Analysis
                </button>
            );
        }

        return null;
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <div className="glass-card" style={{
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                background: 'rgba(15, 15, 15, 0.95)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(20px)'
            }}>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                    {messages.map((m, i) => (
                        <div key={i} style={{
                            marginBottom: '1.2rem',
                            textAlign: m.role === 'bot' ? 'left' : 'right'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '1rem 1.4rem',
                                borderRadius: '18px',
                                maxWidth: '85%',
                                background: m.role === 'bot' ? 'var(--glass)' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                color: 'white',
                                border: m.role === 'bot' ? '1px solid var(--glass-border)' : 'none',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line',
                                boxShadow: m.role === 'user' ? '0 4px 15px rgba(255,107,0,0.2)' : 'none'
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {isProcessing && (
                        <div style={{ textAlign: 'left', marginBottom: '1.2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,107,0,0.1)' }}>
                            <div className="pulse" style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginBottom: '1rem' }}></div>
                            {analysisLogs.map((log, i) => (
                                <div key={i} className="animate-fade-in" style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                                    <span style={{ color: 'var(--primary)', marginRight: '8px' }}>[OK]</span> {log}
                                </div>
                            ))}
                            <div className="loading-dots" style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '0.5rem' }}>...</div>
                        </div>
                    )}


                    {results && (
                        <div className="animate-fade-in" style={{ marginTop: '3rem' }}>
                            <div style={{
                                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                                height: '1px',
                                width: '100%',
                                marginBottom: '2.5rem'
                            }}></div>

                            <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>
                                Situational Analysis Results
                            </h2>

                            <div style={{
                                display: 'grid',
                                gap: '1.5rem',
                                gridTemplateColumns: '1fr'
                            }}>
                                {results.map((res, i) => {
                                    const scorePercent = parseFloat(res.matchPercentage);
                                    let label = 'Strong Match';
                                    if (i === 0) label = 'Closest Match';
                                    else if (i === 1) label = 'Excellent Alternative';
                                    else if (i === 2) label = 'Good Correlation';
                                    else if (i === 3) label = 'Partial Fit';
                                    else label = 'Distant Match';

                                    return (
                                        <div key={res.id} className="animate-fade-in" style={{
                                            padding: '2rem',
                                            background: i === 0 ? 'rgba(255,107,0,0.08)' : 'rgba(255,255,255,0.03)',
                                            borderRadius: '24px',
                                            border: i === 0 ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {label}
                                            </div>
                                            <h3 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.6rem', fontWeight: '800' }}>{res.name}</h3>
                                            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{res.description}</p>

                                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '15px' }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>Equation Comparison</div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'white', marginBottom: '1rem' }}>
                                                    <span>Target Total:</span>
                                                    <span style={{ fontWeight: 'bold' }}>{res.userTotalValue}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'white', marginBottom: '1rem' }}>
                                                    <span>Option Total:</span>
                                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{res.optionTotalValue}</span>
                                                </div>
                                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${Math.min(100, (res.optionTotalValue / res.userTotalValue) * 100)}%`,
                                                        background: 'var(--primary)',
                                                        opacity: 0.8
                                                    }}></div>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ height: '8px', flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${scorePercent}%`,
                                                        background: 'var(--primary)',
                                                        boxShadow: '0 0 20px var(--primary)'
                                                    }}></div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>
                                                        {scorePercent}%
                                                    </span>
                                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Mathematical Match</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {currentStep === 'goal' ? 'Describe your case' : (currentStep === 'factor' ? 'Your focus factors (comma-separated)' : (currentStep === 'listing' ? 'Review identified factors' : (currentStep === 'questions' ? 'Rate Relevance (10 = High)' : 'Next Steps')))}
                    </div>
                    {renderInputArea()}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;

