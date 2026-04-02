// src/components/Header.jsx
import React from 'react';

export const Header = ({ onReset, hasResult, theme, onToggleTheme }) => (
  <header style={{
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(16px)',
    background: theme === 'dark' ? 'rgba(17,17,16,0.92)' : 'rgba(248,247,244,0.92)',
    transition: 'background 0.25s ease',
  }}>
    <div className="container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 58,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28,
          background: 'var(--text-primary)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="var(--text-inverse)" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="var(--text-inverse)" opacity="0.5" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="var(--text-inverse)" opacity="0.5" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="var(--text-inverse)" />
          </svg>
        </div>
        <div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 17,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            RecruitIQ
          </span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {hasResult && (
          <button className="btn btn-ghost" onClick={onReset}
            style={{ padding: '7px 14px', fontSize: 13 }}>
            New Analysis
          </button>
        )}

        {/* Theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </div>
  </header>
);