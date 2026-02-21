import React, { useState, useEffect, useRef } from 'react';
import { evaluateOptions, REHAB_DEFAULTS } from '../utils/DecisionEngine';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your Ankle Recovery Assistant. I'll guide you to the best rehab plan. First, which leg is injured?" }
    ]);
    const [currentStep, setCurrentStep] = useState('leg');
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

    const handleChoice = (choice, value) => {
        addMessage('user', choice);

        const newProfile = { ...injuryProfile };

        setTimeout(() => {
            if (currentStep === 'leg') {
                newProfile.leg = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "Understood. Where is the primary pain located?");
                setCurrentStep('position');
            } else if (currentStep === 'position') {
                newProfile.position = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "Can you bear weight on that ankle right now?");
                setCurrentStep('weightBearing');
            } else if (currentStep === 'weightBearing') {
                newProfile.weightBearing = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "Is there significant swelling or visible bruising?");
                setCurrentStep('swelling');
            } else if (currentStep === 'swelling') {
                newProfile.swelling = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "How many days ago did the injury happen?");
                setCurrentStep('days');
            } else if (currentStep === 'days') {
                newProfile.daysSinceInjury = value;
                setInjuryProfile(newProfile);
                addMessage('bot', "What is your primary symptom currently?");
                setCurrentStep('symptom');
            } else if (currentStep === 'symptom') {
                newProfile.primarySymptom = value;

                let grade = '1';
                if (!newProfile.weightBearing && newProfile.swelling) {
                    grade = '3';
                } else if (!newProfile.weightBearing || newProfile.swelling) {
                    grade = '2';
                }

                const finalDetails = {
                    ...newProfile,
                    grade: grade
                };

                const evaluated = evaluateOptions(REHAB_DEFAULTS.options, REHAB_DEFAULTS.criteria, finalDetails);
                const top3 = evaluated.slice(0, 3);

                addMessage('bot', `Assessment complete. You have a Grade ${grade} sprain. Based on your symptoms, you are in Phase ${top3[0].phase} of recovery.`);
                addMessage('bot', "I've ranked the Top 3 recovery paths and specific exercises for you below:");
                setResults(top3);
                setCurrentStep('completed');
            }
        }, 600);
    };

    const renderOptions = () => {
        if (currentStep === 'leg') {
            return (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Left Leg', 'left')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Left</button>
                    <button onClick={() => handleChoice('Right Leg', 'right')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Right</button>
                </div>
            );
        }
        if (currentStep === 'position') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Lateral (Outer)', 'lateral')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Lateral</button>
                    <button onClick={() => handleChoice('Medial (Inner)', 'medial')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Medial</button>
                    <button onClick={() => handleChoice('High Ankle', 'high')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>High Ankle</button>
                </div>
            );
        }
        if (currentStep === 'weightBearing' || currentStep === 'swelling') {
            return (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Yes', true)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Yes</button>
                    <button onClick={() => handleChoice('No', false)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>No</button>
                </div>
            );
        }
        if (currentStep === 'days') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('0-3 Days', 2)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Recently (0-3d)</button>
                    <button onClick={() => handleChoice('4-14 Days', 7)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>A week or so (4-14d)</button>
                    <button onClick={() => handleChoice('2+ Weeks', 20)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Over 2 weeks</button>
                </div>
            );
        }
        if (currentStep === 'symptom') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => handleChoice('Constant Pain/Swelling', 'pain')} className="btn-primary" style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>🔴 Constant Pain or Swelling</button>
                    <button onClick={() => handleChoice('Mostly Stiff or Weak', 'stiff')} className="btn-primary" style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>🟡 Mostly Stiff or Weak</button>
                    <button onClick={() => handleChoice('Ready for activity', 'ready')} className="btn-primary" style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>🟢 Feeling strong, almost ready</button>
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
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="glass-card" style={{
                height: results ? 'auto' : '550px',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                background: 'rgba(15, 15, 15, 0.9)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                    {messages.map((m, i) => (
                        <div key={i} style={{
                            marginBottom: '1.2rem',
                            textAlign: m.role === 'bot' ? 'left' : 'right'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.8rem 1.2rem',
                                borderRadius: '16px',
                                maxWidth: '85%',
                                background: m.role === 'bot' ? 'var(--glass)' : 'var(--primary)',
                                color: 'white',
                                border: m.role === 'bot' ? '1px solid var(--glass-border)' : 'none',
                                fontSize: '1rem',
                                lineHeight: '1.5'
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {results && (
                        <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
                            <div style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                {getPhaseLabel(results[0].phase)}
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>🎯 Recommended Rehab Priority</h2>
                            {results.map((res, index) => (
                                <div key={res.id} style={{
                                    background: 'rgba(255,107,0,0.05)',
                                    border: `1px solid ${index === 0 ? 'var(--primary)' : 'var(--glass-border)'}`,
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    marginBottom: '2rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        left: '20px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '2px 10px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        RANK {index + 1}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.4rem' }}>{res.name}</h3>
                                        <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.2rem' }}>{res.score}/10</span>
                                    </div>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', margin: '0.8rem 0' }}>{res.description}</p>

                                    <div style={{ marginTop: '1.5rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            🏃 Recommended Exercises
                                        </h4>
                                        <div style={{ display: 'grid', gap: '0.8rem' }}>
                                            {res.exercises.map(ex => (
                                                <div key={ex.name} style={{
                                                    background: 'rgba(255,255,255,0.03)',
                                                    padding: '0.8rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid rgba(255,255,255,0.05)'
                                                }}>
                                                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{ex.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{ex.description}</div>
                                                </div>
                                            ))}
                                            {res.exercises.length === 0 && (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                                                    Consult your clinician for stage-specific exercises for this path.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontStyle: 'italic', marginTop: '1.2rem', padding: '0.8rem', background: 'rgba(255,107,0,0.1)', borderRadius: '8px' }}>
                                        💡 {res.advice}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {!results && (
                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                        {renderOptions()}
                    </div>
                )}
                {results && renderOptions()}
            </div>
        </div>
    );
};

export default ChatBot;
