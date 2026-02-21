import React from 'react';
import ChatBot from './components/ChatBot';
import './index.css';

function App() {
  return (
    <div className="container animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: '10vh'
    }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="title-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
          Decision Companion
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>
          Interactive Ankle Recovery Assistant
        </p>
      </header>

      <main style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <ChatBot />
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        Designed for "How You Build" - Decision Companion System v2.0
      </footer>
    </div>
  );
}

export default App;
