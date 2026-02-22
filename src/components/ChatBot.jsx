import React, { useState, useEffect, useRef } from 'react';
import { evaluateOptions, REHAB_DEFAULTS } from '../utils/DecisionEngine';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your Ankle Recovery Companion. I'll help you find the most suitable rehab path based on your condition and priorities." },
        { role: 'bot', text: "On a scale of 1-10, how intense is your pain right now?" }
    ]);
    const [currentStep, setCurrentStep] = useState('pain');
    const [injuryProfile, setInjuryProfile] = useState({});
    const [results, setResults] = useState(null);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const handleChoice = (display, value) => {
        addMessage('user', display);

        const newProfile = { ...injuryProfile };

        setTimeout(() => {
            if (currentStep === 'pain') {
                newProfile.pain = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "How would you describe the swelling/bruising?");
                setCurrentStep('swelling');
            } else if (currentStep === 'swelling') {
                newProfile.swelling = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "How restricted is your mobility?");
                setCurrentStep('mobility');
            } else if (currentStep === 'mobility') {
                newProfile.mobilityLabel = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "How many days ago did the injury happen?");
                setCurrentStep('days');
            } else if (currentStep === 'days') {
                newProfile.daysSinceInjury = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "Now, what are your priorities? What's your urgency to return to full activity?");
                setCurrentStep('urgency');
            } else if (currentStep === 'urgency') {
                newProfile.urgency = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "What is your budget level for this rehabilitation?");
                setCurrentStep('budget');
            } else if (currentStep === 'budget') {
                newProfile.budget = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "Lastly, what is your risk tolerance? (Higher risk = faster but less stable rehab)");
                setCurrentStep('risk');
            } else if (currentStep === 'risk') {
                newProfile.riskTolerance = value;
                setInjuryProfile(newProfile);

                const evaluated = evaluateOptions(REHAB_DEFAULTS.options, REHAB_DEFAULTS.criteria, {
                    ...newProfile,
                    riskTolerance: value
                });

                addMessage('bot', "Assessment complete. Using multi-criteria decision modeling, I've ranked the best rehabilitation paths for you.");
                setResults(evaluated);
                setCurrentStep('completed');
            }
        }, 600);
    };

    const renderOptions = () => {
        if (currentStep === 'pain') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                    {[2, 4, 6, 8, 10].map(val => (
                        <button key={val} onClick={() => handleChoice(val.toString(), val)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>{val}</button>
                    ))}
                </div>
            );
        }
        if (currentStep === 'swelling') {
            return (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Low', 'low')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Low</button>
                    <button onClick={() => handleChoice('Medium', 'medium')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Medium</button>
                    <button onClick={() => handleChoice('High', 'high')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>High</button>
                </div>
            );
        }
        if (currentStep === 'mobility') {
            return (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Mild', 'mild')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Mild</button>
                    <button onClick={() => handleChoice('Moderate', 'moderate')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Moderate</button>
                    <button onClick={() => handleChoice('Severe', 'severe')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Severe</button>
                </div>
            );
        }
        if (currentStep === 'days') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('0-3 Days', 1)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>0-3 Days</button>
                    <button onClick={() => handleChoice('4-14 Days', 7)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>4-14 Days</button>
                    <button onClick={() => handleChoice('14+ Days', 20)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>14+ Days</button>
                </div>
            );
        }
        if (currentStep === 'urgency' || currentStep === 'budget' || currentStep === 'risk') {
            return (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Low', 'low')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Low</button>
                    <button onClick={() => handleChoice('Medium', 'medium')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Medium</button>
                    <button onClick={() => handleChoice('High', 'high')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>High</button>
                </div>
            );
        }
        if (currentStep === 'completed') {
            return (
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem', background: 'var(--glass)' }}>
                    Start New Assessment
                </button>
            );
        }
        return null;
    };

    const getPhaseLabel = (p) => {
        if (p === 1) return 'PHASE 1: ACUTE (Protect)';
        if (p === 2) return 'PHASE 2: REPAIR (Strengthen)';
        return 'PHASE 3: REMODELING (Return)';
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
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem', maxHeight: results ? 'none' : '500px' }}>
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

                    {results && (
                        <div className="animate-fade-in" style={{ marginTop: '3rem' }}>
                            <div style={{
                                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                                height: '1px',
                                width: '100%',
                                marginBottom: '2.5rem'
                            }}></div>

                            <div style={{
                                background: 'rgba(255,107,0,0.1)',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '30px',
                                marginBottom: '2.5rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                display: 'inline-block',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                position: 'relative',
                                fontSize: '0.9rem',
                                letterSpacing: '1px'
                            }}>
                                {getPhaseLabel(results[0].phase)}
                            </div>

                            <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>
                                Decision Comparison Matrix
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
                                                BEST MATCH
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: '1.6rem', color: 'white', marginBottom: '0.5rem' }}>{res.name}</h3>
                                                <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.5' }}>{res.description}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', marginLeft: '2rem' }}>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '2px' }}>SCORE</div>
                                                <div style={{ color: 'white', fontWeight: '800', fontSize: '2.2rem', lineHeight: '1' }}>{res.score}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/ 10</div>
                                            </div>
                                        </div>

                                        <div style={{ margin: '1.5rem 0', padding: '1.2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>WHY THIS OPTION?</div>
                                            <p style={{ fontSize: '0.95rem', color: 'white', margin: 0 }}>{res.reasoning}</p>
                                        </div>

                                        {res.warnings.length > 0 && (
                                            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: '10px' }}>
                                                {res.warnings.map((w, i) => (
                                                    <div key={i} style={{ color: '#ff6666', fontSize: '0.85rem' }}>⚠️ {w}</div>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                                    Scoring Breakdown
                                                </h4>
                                                {res.breakdown.map(b => (
                                                    <div key={b.criterion} style={{ marginBottom: '0.8rem' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                                            <span style={{ color: 'var(--text-dim)' }}>{b.criterion}</span>
                                                            <span style={{ color: 'white' }}>{b.score}/10</span>
                                                        </div>
                                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', background: 'var(--primary)', width: `${b.score * 10}%`, opacity: 0.3 + (parseFloat(b.impact) / 10) }}></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                <h4 style={{ fontSize: '0.8rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                                    Targeted Exercises
                                                </h4>
                                                <div style={{ display: 'grid', gap: '0.8rem' }}>
                                                    {res.exercises.map(ex => (
                                                        <div key={ex.name} style={{
                                                            background: 'rgba(255,107,0,0.03)',
                                                            padding: '1rem',
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,107,0,0.1)'
                                                        }}>
                                                            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'white' }}>{ex.name}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '4px' }}>{ex.description}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {!results && (
                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Select an option:</div>
                        {renderOptions()}
                    </div>
                )}
                {results && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        {renderOptions()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;
