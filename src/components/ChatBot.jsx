import React, { useState, useEffect, useRef } from 'react';
import { evaluateOptions } from '../utils/DecisionEngine';
import { analyzeGoal } from '../utils/AIService';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your AI Situational Companion. Tell me, what's a major decision or case you're analyzing? (e.g., 'Moving to a new city', 'Choosing a career path')" }
    ]);
    const [currentStep, setCurrentStep] = useState('goal'); // 'goal', 'analyzing', 'listing', 'questions', 'completed'
    const [userInput, setUserInput] = useState('');
    const [decisionData, setDecisionData] = useState({ situations: [], options: [] });
    const [situationIndex, setSituationIndex] = useState(0);
    const [userRatings, setUserRatings] = useState({});
    const [results, setResults] = useState(null);
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
        setCurrentStep('analyzing');
        setIsProcessing(true);

        try {
            const data = await analyzeGoal(goal);
            setDecisionData(data);
            setIsProcessing(false);

            // Factor Listing Phase
            const factorList = data.situations.map((s, i) => `${i + 1}. ${s.label}`).join('\n');
            addMessage('bot', `I've analyzed your case and identified ${data.situations.length} key factors that will drive this decision:\n\n${factorList}\n\nI also found ${data.options.length} potential options to evaluate.`);

            setCurrentStep('listing');
        } catch (error) {
            setIsProcessing(false);
            addMessage('bot', "Sorry, I ran into an error analyzing those situations. Could you try rephrasing your goal?");
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
        if (currentStep === 'goal') {
            return (
                <form onSubmit={handleGoalSubmit} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Describe your case..."
                        className="input-field"
                        style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>Analyze</button>
                </form>
            );
        }

        if (currentStep === 'listing') {
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
                                boxShadow: m.role === 'user' ? '0 4px 15px rgba(255,107,0,0.2)' : 'none'
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {isProcessing && (
                        <div style={{ textAlign: 'left', marginBottom: '1.2rem' }}>
                            <div className="loading-dots" style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>...</div>
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

                            <div style={{ display: 'grid', gap: '2.5rem' }}>
                                {results.map((res, index) => (
                                    <div key={res.id} style={{
                                        background: index === 0 ? 'rgba(255,107,0,0.08)' : 'rgba(255,255,255,0.02)',
                                        border: `1px solid ${index === 0 ? 'var(--primary)' : 'var(--glass-border)'}`,
                                        borderRadius: '20px',
                                        padding: '2rem',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease',
                                        boxShadow: index === 0 ? '0 15px 40px rgba(255,107,0,0.1)' : 'none'
                                    }}>
                                        {index === 0 && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-15px',
                                                right: '30px',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                padding: '5px 15px',
                                                borderRadius: '30px',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold',
                                                boxShadow: '0 5px 15px rgba(255,107,0,0.4)'
                                            }}>
                                                OPTIMAL CASE MATCH
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: '1.6rem', color: 'white', marginBottom: '0.5rem' }}>{res.name}</h3>
                                                <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.5' }}>{res.description}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', marginLeft: '2rem' }}>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '2px' }}>FIT SCORE</div>
                                                <div style={{ color: 'white', fontWeight: '800', fontSize: '2.2rem', lineHeight: '1' }}>{res.score}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/ 10</div>
                                            </div>
                                        </div>


                                        <div style={{ marginTop: '2rem' }}>
                                            <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                                Scenario Impact Scores
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                                {res.breakdown.map(b => (
                                                    <div key={b.criterion} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                                                        <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '4px' }}>{b.criterion}</div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                                                <div style={{ height: '100%', background: 'var(--primary)', width: `${b.score * 10}%`, opacity: b.relevance / 10 }}></div>
                                                            </div>
                                                            <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: '600' }}>{b.score}</span>
                                                        </div>
                                                        <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', marginTop: '4px' }}>Relevance: {b.relevance}/10</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {currentStep === 'goal' ? 'Describe your case' : (currentStep === 'listing' ? 'Review identified factors' : (currentStep === 'questions' ? 'Rate Relevance (10 = High)' : 'Next Steps'))}
                    </div>
                    {renderInputArea()}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;

