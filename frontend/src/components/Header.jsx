// src/components/Header.jsx
import React from 'react';

export const Header = ({ onReset, hasResult }) => (
  <header style={{
    borderBottom: '1px solid var(--border)',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(20px)',
    background: 'rgba(10, 14, 26, 0.85)',
  }}>
    <div className="container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--gradient-accent)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>⚡</div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '-0.02em',
        }}>
          Agentic<span style={{ color: 'var(--accent-blue)' }}>Recruiter</span>
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontSize: 12,
          color: 'var(--text-muted)',
          padding: '4px 10px',
          background: 'rgba(104, 211, 145, 0.08)',
          border: '1px solid rgba(104, 211, 145, 0.2)',
          borderRadius: 100,
          color: 'var(--accent-green)',
          fontWeight: 600,
        }}>
          ● AI Powered
        </span>
        {hasResult && (
          <button className="btn btn-ghost" onClick={onReset} style={{ padding: '8px 16px', fontSize: 13 }}>
            ↩ New Analysis
          </button>
        )}
      </div>
    </div>
  </header>
);