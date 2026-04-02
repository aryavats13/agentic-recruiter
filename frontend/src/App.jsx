// src/App.jsx — Root component
import React from 'react';
import './styles/globals.css';
import { Header } from './components/Header';
import { UploadForm } from './components/UploadForm';
import { ResultsPanel } from './components/ResultsPanel';
import { useAnalysis } from './hooks/useAnalysis';

function App() {
  const { status, progress, result, error, activeTab, analyze, reset, setActiveTab, isLoading } = useAnalysis();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Header onReset={reset} hasResult={!!result} />

      <main style={{ paddingBottom: 80 }}>

        {/* Hero — shown only when no result */}
        {!result && (
          <div style={{
            background: 'var(--gradient-hero)',
            borderBottom: '1px solid var(--border)',
            padding: '60px 0 52px',
            textAlign: 'center',
          }}>
            <div className="container">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                background: 'rgba(99,179,237,0.08)',
                border: '1px solid rgba(99,179,237,0.2)',
                borderRadius: 100,
                marginBottom: 20,
                fontSize: 12,
                color: 'var(--accent-blue)',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}>
                ⚡ POWERED BY GEMINI AI · 4 SPECIALIZED AGENTS
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}>
                Agentic Recruiter &<br />
                <span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Resume Optimizer
                </span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                Upload any resume, paste a job description, and get a comprehensive AI-powered match score, 
                optimization suggestions, and tailored interview questions — in under 60 seconds.
              </p>

              {/* Feature pills */}
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
                {['Match Score 0–100', 'Skill Gap Analysis', 'ATS Optimization', 'Bullet Rewrites', 'Interview Questions'].map(f => (
                  <span key={f} style={{
                    padding: '5px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: 100,
                    fontSize: 12,
                    color: 'var(--text-muted)',
                  }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container" style={{ marginTop: 36 }}>
          {!result ? (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>

              {/* Error Banner */}
              {error && (
                <div style={{
                  padding: '14px 18px',
                  background: 'rgba(252,129,129,0.08)',
                  border: '1px solid rgba(252,129,129,0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-red)',
                  marginBottom: 20,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="card">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 6 }}>
                  Start Your Analysis
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
                  Upload a PDF resume and paste the job description to run all 4 AI agents.
                </p>
                <UploadForm
                  onSubmit={analyze}
                  isLoading={isLoading}
                  progress={progress}
                />
              </div>

              {/* How it works */}
              <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { n: '01', title: 'Parse', desc: 'PDF text extraction & profile structuring' },
                  { n: '02', title: 'Match', desc: 'Skill & experience scoring against JD' },
                  { n: '03', title: 'Optimize', desc: 'Bullet rewrites, keywords & ATS tips' },
                  { n: '04', title: 'Interview', desc: 'Tailored Q&A guide for the hiring team' },
                ].map(({ n, title, desc }) => (
                  <div key={n} style={{
                    padding: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 11, fontWeight: 800,
                      color: 'var(--accent-blue)',
                      letterSpacing: '0.1em',
                      marginBottom: 6,
                    }}>{n}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ResultsPanel
              result={result}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;