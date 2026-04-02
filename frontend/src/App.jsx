// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import { Header } from './components/Header';
import { UploadForm } from './components/UploadForm';
import { ResultsPanel } from './components/ResultsPanel';
import { useAnalysis } from './hooks/useAnalysis';

function App() {
  const { status, progress, result, error, activeTab, analyze, reset, setActiveTab, isLoading } = useAnalysis();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', transition: 'background 0.25s ease' }}>
      <Header onReset={reset} hasResult={!!result} theme={theme} onToggleTheme={toggleTheme} />

      <main style={{ paddingBottom: 80 }}>

        {/* Hero */}
        {!result && (
          <div style={{
            background: 'var(--gradient-hero)',
            borderBottom: '1px solid var(--border)',
            padding: '64px 0 56px',
          }}>
            <div className="container">
              <div style={{ maxWidth: 600 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  marginBottom: 24,
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  AI-Powered · 5 Agents
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 54px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: 18,
                  color: 'var(--text-primary)',
                }}>
                  Intelligent Resume<br />Analysis Platform
                </h1>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 480,
                  marginBottom: 36,
                }}>
                  Upload a resume, paste a job description, and get a comprehensive AI-powered evaluation — match score, skill gap analysis, optimization suggestions, interview preparation, and company intelligence.
                </p>

                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Match Scoring', desc: 'Weighted 0–100 score' },
                    { label: 'Gap Analysis', desc: 'Critical vs preferred skills' },
                    { label: 'ATS Optimization', desc: 'Keyword recommendations' },
                    { label: 'Interview Prep', desc: 'Role-specific questions' },
                    { label: 'Company Intel', desc: 'Culture & salary insights' },
                  ].map(({ label, desc }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 5, height: 5,
                        borderRadius: '50%',
                        background: 'var(--text-primary)',
                        marginTop: 6,
                        flexShrink: 0,
                      }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container" style={{ marginTop: 36 }}>
          {!result ? (
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              {error && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(220,38,38,0.06)',
                  border: '1px solid rgba(220,38,38,0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-red)',
                  marginBottom: 20,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 1a6 6 0 100 12A6 6 0 007 1zM6.5 4h1v4h-1V4zm0 5h1v1h-1V9z"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="card">
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, marginBottom: 4 }}>New Analysis</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                    All five agents run automatically. Company name is optional.
                  </p>
                </div>
                <UploadForm onSubmit={analyze} isLoading={isLoading} progress={progress} />
              </div>

              {/* Process steps */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 8,
                marginTop: 20,
              }}>
                {[
                  { n: '01', label: 'Parse' },
                  { n: '02', label: 'Match' },
                  { n: '03', label: 'Optimize' },
                  { n: '04', label: 'Interview' },
                  { n: '05', label: 'Company' },
                ].map(({ n, label }) => (
                  <div key={n} style={{
                    padding: '12px 10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 3 }}>{n}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ResultsPanel result={result} activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;