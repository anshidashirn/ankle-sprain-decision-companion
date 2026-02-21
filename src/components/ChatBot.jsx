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

                let grade = '1';
                if (!newProfile.weightBearing && newProfile.swelling) {
                    grade = '3';
                } else if (!newProfile.weightBearing || newProfile.swelling) {
                    grade = '2';
                }

                const finalDetails = {
                    leg: newProfile.leg,
                    position: newProfile.position,
                    grade: grade
                };

                const evaluated = evaluateOptions(REHAB_DEFAULTS.options, REHAB_DEFAULTS.criteria, finalDetails);
                const top3 = evaluated.slice(0, 3);

                addMessage('bot', `Assessment complete. You have a Grade ${grade} sprain. I've ranked the Top 3 recovery paths for you below:`);
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
        if (currentStep === 'completed') {
            return (
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem', background: 'var(--glass)' }}>
                    Start New Assessment
                </button>
            );
        }
        return null;
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="glass-card" style={{
                height: results ? 'auto' : '500px',
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
                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>🎯 Recommended Rehab Priority</h2>
                            {results.map((res, index) => (
                                <div key={res.id} style={{
                                    background: 'rgba(255,107,0,0.05)',
                                    border: `1px solid ${index === 0 ? 'var(--primary)' : 'var(--glass-border)'}`,
                                    borderRadius: '12px',
                                    padding: '1.2rem',
                                    marginBottom: '1.5rem',
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
                                        <h3 style={{ fontSize: '1.2rem' }}>{res.name}</h3>
                                        <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{res.score}/10</span>
                                    </div>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', margin: '0.5rem 0' }}>{res.description}</p>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontStyle: 'italic', marginTop: '0.5rem' }}>
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
