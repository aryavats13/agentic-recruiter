// src/components/SuggestionsTab.jsx
import React, { useState } from 'react';

const ImpactBadge = ({ impact }) => {
  const map = { High: 'tag-green', Medium: 'tag-orange', Low: 'tag-neutral' };
  return <span className={`tag ${map[impact] || 'tag-neutral'}`}>{impact}</span>;
};

export const SuggestionsTab = ({ suggestions }) => {
  const [openBullet, setOpenBullet] = useState(null);
  const { overallResumeScore, summaryRewrite, bulletImprovements, keywordsToAdd, priorityActions, formattingTips, atsOptimizationTips } = suggestions;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Score + Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16 }}>
        <div className="card fade-in" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="info-label" style={{ marginBottom: 8 }}>Resume Quality</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 52, fontWeight: 700,
            color: overallResumeScore >= 70 ? 'var(--accent-green)' : 'var(--accent-orange)',
            lineHeight: 1,
          }}>{overallResumeScore}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>out of 100</div>
        </div>

        <div className="card fade-in">
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 14 }}>Summary Rewrite</div>
          {summaryRewrite.current && summaryRewrite.current !== 'No summary found' && (
            <div style={{ marginBottom: 12 }}>
              <div className="info-label">Current</div>
              <div style={{
                fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic',
                padding: '8px 12px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--border)',
                lineHeight: 1.6,
              }}>{summaryRewrite.current}</div>
            </div>
          )}
          <div className="info-label" style={{ color: 'var(--accent-green)' }}>Suggested</div>
          <div style={{
            fontSize: 13, color: 'var(--text-primary)',
            padding: '10px 12px',
            background: 'rgba(22,163,74,0.04)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '3px solid var(--accent-green)',
            lineHeight: 1.7,
          }}>{summaryRewrite.suggested}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{summaryRewrite.reason}</div>
        </div>
      </div>

      {/* Priority Actions */}
      {priorityActions?.length > 0 && (
        <div className="card fade-in">
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 14 }}>Priority Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {priorityActions.map((action, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 14px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 16, color: 'var(--text-muted)', minWidth: 24, flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{action.action}</span>
                <ImpactBadge impact={action.impact} />
                <span className="tag tag-neutral">{action.effort}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bullet improvements */}
      <div className="card fade-in">
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 14 }}>
          Bullet Point Rewrites
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bulletImprovements.map((item, i) => (
            <div key={i} className={`accordion-item${openBullet === i ? ' accordion-item--open' : ''}`}>
              <button className="accordion-trigger" onClick={() => setOpenBullet(openBullet === i ? null : i)}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
                  {item.original}
                </span>
                <svg className={`chevron${openBullet === i ? ' chevron--open' : ''}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openBullet === i && (
                <div className="accordion-content" style={{ paddingTop: 14 }}>
                  <div className="info-label" style={{ color: 'var(--accent-green)', marginBottom: 6 }}>Improved</div>
                  <div style={{
                    fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.65,
                    padding: '10px 12px',
                    background: 'rgba(22,163,74,0.04)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--accent-green)',
                    marginBottom: 8,
                  }}>{item.improved}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.reason}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <div className="info-label" style={{ color: 'var(--accent-red)', marginBottom: 12 }}>Must-Add Keywords</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {keywordsToAdd.mustAdd.map(kw => <span key={kw} className="tag tag-red">{kw}</span>)}
          </div>
        </div>
        <div className="card fade-in">
          <div className="info-label" style={{ color: 'var(--accent-orange)', marginBottom: 12 }}>Should-Add Keywords</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {keywordsToAdd.shouldAdd.map(kw => <span key={kw} className="tag tag-orange">{kw}</span>)}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <TipsList title="ATS Optimization" tips={atsOptimizationTips} />
        <TipsList title="Formatting Tips" tips={formattingTips} />
      </div>
    </div>
  );
};

const TipsList = ({ title, tips }) => (
  <div className="card fade-in">
    <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 12 }}>{title}</div>
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tips?.map((tip, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 6, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);