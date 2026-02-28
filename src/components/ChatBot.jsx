import React, { useState, useEffect, useRef } from 'react';
import { evaluateOptions } from '../utils/DecisionEngine';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your Structured Decision Companion. I use an architectural framework to help you make rational choices.\n\nFirst, what is the **Decision Goal** you're analyzing?" }
    ]);
    const [currentStep, setCurrentStep] = useState('goal'); // 'goal', 'options', 'criteria', 'analyzing', 'weighting', 'completed'
    const [userInput, setUserInput] = useState('');
    const [goal, setGoal] = useState('');
    const [userOptions, setUserOptions] = useState([]);
    const [userCriteria, setUserCriteria] = useState([]);
    const [decisionData, setDecisionData] = useState({ criteria: [], options: [] });
    const [criteriaIndex, setCriteriaIndex] = useState(0);
    const [userWeights, setUserWeights] = useState({});
    const [manualScores, setManualScores] = useState({}); // { critId: { optId: score } }
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

    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        setGoal(userInput);
        addMessage('user', userInput);
        setUserInput('');
        setCurrentStep('options');
        addMessage('bot', "Great. Do you have specific **Options** in mind? (Enter them comma-separated).");
    };

    const handleOptionsSubmit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const opts = userInput.split(',').map(o => o.trim()).filter(o => o);
        setUserOptions(opts);
        addMessage('user', userInput);
        setUserInput('');
        setCurrentStep('criteria');
        addMessage('bot', "And what **Criteria** or factors are important to you? (e.g., 'Cost, Safety, Quality').");
    };

    const handleCriteriaSubmit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const crits = userInput.split(',').map(c => c.trim()).filter(c => c);
        if (crits.length === 0) {
            addMessage('bot', "Please enter at least one criterion to proceed.");
            return;
        }

        setUserCriteria(crits);
        addMessage('user', userInput);
        setUserInput('');
        setCurrentStep('analyzing');

        // Final structural data (Local only, no AI)
        const data = {
            goal: goal,
            options: userOptions.map((name, i) => ({ id: `o${i + 1}`, name, description: `User-defined choice: ${name}` })),
            criteria: crits.map((label, i) => ({
                id: `c${i + 1}`,
                label,
                question: `On a scale of 2-10, how important is **${label}**?`,
                weights: {}
            }))
        };

        // Initialize manual scores
        const initialScores = {};
        data.criteria.forEach(c => {
            initialScores[c.id] = {};
            data.options.forEach(o => {
                initialScores[c.id][o.id] = 6; // Default starting value
            });
        });

        setManualScores(initialScores);
        setDecisionData(data);

        addMessage('bot', `**Framework Configured.** I've organized your **${data.options.length} options** and **${data.criteria.length} criteria**.

Now, let's determine the relative importance of each factor to create your personalized decision model.`);
        setCurrentStep('ready_to_weigh_criteria');
    };

    const startWeightingCriteria = () => {
        askNextCriterion(0);
    };

    const askNextCriterion = (index) => {
        if (index < decisionData.criteria.length) {
            setCurrentStep('weighting_criteria');
            setCriteriaIndex(index);
            const crit = decisionData.criteria[index];
            addMessage('bot', `**[Criterion ${index + 1}/${decisionData.criteria.length}]** ${crit.question}`);
        } else {
            setCurrentStep('matrix');
            addMessage('bot', "Criteria weighted. Now, please fill in the **Performance Scores** (1-10) for each option against each criterion in the table below.");
        }
    };

    const handleCriterionWeight = (value) => {
        const currentCrit = decisionData.criteria[criteriaIndex];
        addMessage('user', `Importance: ${value}/10`);
        const newWeights = { ...userWeights, [currentCrit.id]: value };
        setUserWeights(newWeights);

        setTimeout(() => {
            askNextCriterion(criteriaIndex + 1);
        }, 500);
    };


    const handleManualScoreChange = (critId, optId, value) => {
        const score = Math.max(1, Math.min(10, parseInt(value) || 0));
        setManualScores(prev => ({
            ...prev,
            [critId]: {
                ...prev[critId],
                [optId]: score
            }
        }));
    };

    const finalizeDecision = () => {
        setIsProcessing(true);
        setCurrentStep('completed');
        setTimeout(() => {
            // Rebuild criteria weights from manual scores
            const updatedCriteria = decisionData.criteria.map(crit => ({
                ...crit,
                weights: manualScores[crit.id]
            }));

            const evaluated = evaluateOptions(decisionData.options, updatedCriteria, userWeights);
            setResults(evaluated);
            setIsProcessing(false);
            addMessage('bot', "Analysis complete. Here are the ranked recommendations based strictly on your provided weights and performance scores.");
        }, 1000);
    };

    const renderInputArea = () => {
        const inputMap = {
            goal: { placeholder: "Describe your goal...", handler: handleGoalSubmit },
            options: { placeholder: "Option A, Option B...", handler: handleOptionsSubmit },
            criteria: { placeholder: "Factor 1, Factor 2...", handler: handleCriteriaSubmit }
        };

        if (inputMap[currentStep]) {
            return (
                <form onSubmit={inputMap[currentStep].handler} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={inputMap[currentStep].placeholder}
                        className="input-field"
                        style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>Next</button>
                </form>
            );
        }

        if (currentStep === 'ready_to_weigh_criteria') {
            return <button onClick={startWeightingCriteria} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Start Weighting Criteria</button>;
        }

        if (currentStep === 'weighting_criteria') {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                    {[2, 4, 6, 8, 10].map(val => (
                        <button key={val} onClick={() => handleCriterionWeight(val)} className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>{val}</button>
                    ))}
                </div>
            );
        }


        if (currentStep === 'matrix') {
            return (
                <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
                    <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--glass-border)', padding: '1rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '0.8rem', textAlign: 'left', color: 'var(--primary)' }}>Criteria \ Options</th>
                                    {decisionData.options.map(opt => (
                                        <th key={opt.id} style={{ padding: '0.8rem', textAlign: 'center' }}>
                                            {opt.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {decisionData.criteria.map(crit => (
                                    <tr key={crit.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>
                                            {crit.label}
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 'normal' }}>Importance: {userWeights[crit.id]}</div>
                                        </td>
                                        {decisionData.options.map(opt => (
                                            <td key={opt.id} style={{ padding: '0.8rem', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
                                                    {[2, 4, 6, 8, 10].map(val => (
                                                        <button
                                                            key={val}
                                                            onClick={() => handleManualScoreChange(crit.id, opt.id, val)}
                                                            className="btn-primary"
                                                            style={{
                                                                padding: '0.2rem 0.5rem',
                                                                fontSize: '0.7rem',
                                                                background: manualScores[crit.id]?.[opt.id] === val ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                                border: manualScores[crit.id]?.[opt.id] === val ? 'none' : '1px solid var(--glass-border)',
                                                                opacity: manualScores[crit.id]?.[opt.id] === val ? 1 : 0.6
                                                            }}
                                                        >
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={finalizeDecision} className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1.5rem' }}>Evaluate & Rank</button>
                </div>
            );
        }

        if (currentStep === 'completed') {
            return <button onClick={() => window.location.reload()} className="btn-primary" style={{ width: '100%' }}>New Analysis</button>;
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
                        <div key={i} style={{ marginBottom: '1.2rem', textAlign: m.role === 'bot' ? 'left' : 'right' }}>
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
                                whiteSpace: 'pre-line'
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {isProcessing && (
                        <div style={{ textAlign: 'left', marginBottom: '1.2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                            <div className="pulse" style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginBottom: '1rem' }}></div>
                            {analysisLogs.map((log, i) => (
                                <div key={i} className="animate-fade-in" style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                                    <span style={{ color: 'var(--primary)', marginRight: '8px' }}>[INIT]</span> {log}
                                </div>
                            ))}
                        </div>
                    )}

                    {results && (
                        <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
                            <h2 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center' }}>Ranked Recommendations</h2>

                            {results.sensitivity?.pivotFound && (
                                <div style={{
                                    background: 'rgba(255, 107, 0, 0.05)',
                                    border: '1px solid var(--primary)',
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    marginBottom: '2rem',
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>⚖️</span>
                                    <span>
                                        **Sensitivity Insight**: If you increased the importance of **{results.sensitivity.factor}** by just **{results.sensitivity.requiredDelta}%**, the top recommendation would flip.
                                    </span>
                                </div>
                            )}

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {results.ranked.map((res, i) => (
                                    <div key={res.id} style={{
                                        padding: '2rem',
                                        background: i === 0 ? 'rgba(255,107,0,0.1)' : 'rgba(255,255,255,0.03)',
                                        borderRadius: '24px',
                                        border: i === 0 ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <div style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                            {i === 0 ? 'Top Pick' : `Alternative #${i + 1}`}
                                        </div>
                                        <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{res.name}</h3>
                                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>{res.description}</p>

                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: '500' }}>Executive Reasoning:</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                                                {res.reasoning}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ height: '6px', flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${res.matchPercentage}%`, background: 'var(--primary)' }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>{res.matchPercentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                    {renderInputArea()}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;

