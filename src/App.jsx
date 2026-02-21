import React, { useState, useEffect } from 'react';
import { evaluateOptions, REHAB_DEFAULTS } from './utils/DecisionEngine';
import './index.css';

function App() {
  const [criteria, setCriteria] = useState(REHAB_DEFAULTS.criteria);
  const [options, setOptions] = useState(REHAB_DEFAULTS.options);
  const [results, setResults] = useState([]);
  const [injuryDetails, setInjuryDetails] = useState({
    grade: '1',
    leg: 'left',
    position: 'lateral'
  });

  useEffect(() => {
    const evaluated = evaluateOptions(options, criteria, injuryDetails);
    setResults(evaluated);
  }, [options, criteria, injuryDetails]);

  const updateWeight = (id, newWeight) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, weight: parseInt(newWeight) || 0 } : c));
  };

  return (
    <div className="container animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          Decision Companion
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>
          Optimizing Ankle Sprain Rehabilitation Paths
        </p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Sidebar: Criteria & Weights */}
        <section>
          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🦶 Injury Profile
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Sprain Grade</label>
              <select
                value={injuryDetails.grade}
                onChange={(e) => setInjuryDetails(prev => ({ ...prev, grade: e.target.value }))}
                style={{ marginBottom: '1rem' }}
              >
                <option value="1">Grade I (Mild)</option>
                <option value="2">Grade II (Moderate)</option>
                <option value="3">Grade III (Severe)</option>
              </select>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Affected Leg</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  onClick={() => setInjuryDetails(prev => ({ ...prev, leg: 'left' }))}
                  style={{ flex: 1, background: injuryDetails.leg === 'left' ? 'var(--primary)' : 'var(--glass)' }}
                >Left</button>
                <button
                  onClick={() => setInjuryDetails(prev => ({ ...prev, leg: 'right' }))}
                  style={{ flex: 1, background: injuryDetails.leg === 'right' ? 'var(--primary)' : 'var(--glass)' }}
                >Right</button>
              </div>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Pain Position</label>
              <select
                value={injuryDetails.position}
                onChange={(e) => setInjuryDetails(prev => ({ ...prev, position: e.target.value }))}
              >
                <option value="lateral">Lateral (Outer)</option>
                <option value="medial">Medial (Inner)</option>
                <option value="high">High Ankle</option>
              </select>
            </div>
          </div>

          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚙️ Decision Priorities
            </h2>
            {criteria.map(c => (
              <div key={c.id} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 600 }}>{c.name}</label>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{c.weight}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={c.weight}
                  onChange={(e) => updateWeight(c.id, e.target.value)}
                  style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{c.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <h3>Logic Explanation</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-dim)' }}>
              This system uses a <strong>Weighted Sum Model</strong> with dynamic multipliers based on your <strong>Injury Grade</strong>.
              <br /><br />
              <em>Transparent. Explainable. Data-driven.</em>
            </p>
          </div>
        </section>

        {/* Right Content: Results */}
        <section>
          <h2 style={{ marginBottom: '1.5rem' }}>Personalized Recommendations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {results.map((res, index) => (
              <div key={res.id} className="glass-card" style={{
                borderLeft: index === 0 ? '4px solid var(--primary)' : '1px solid var(--glass-border)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      {index === 0 && '🏆 '}{res.name}
                    </h3>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>{res.description}</p>

                    <div style={{
                      background: 'rgba(255,107,0,0.1)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--primary-glow)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      marginTop: '1rem'
                    }}>
                      💡 {res.advice}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="badge badge-primary" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
                      {res.score} / 10
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--glass-border)',
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {res.details.map(detail => (
                    <div key={detail.criterionName} style={{ fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{detail.criterionName}:</span>
                      <span style={{ marginLeft: '0.3rem', fontWeight: 600 }}>{detail.value}/10</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        Designed for "How You Build" - Decision Companion System v1.1
      </footer>
    </div>
  );
}

export default App;
