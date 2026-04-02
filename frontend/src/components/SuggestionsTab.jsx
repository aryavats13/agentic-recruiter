// src/components/SuggestionsTab.jsx
import React, { useState } from 'react';

const ImpactBadge = ({ impact }) => {
  const styles = {
    High:   { bg: 'rgba(104,211,145,0.12)', color: 'var(--accent-green)' },
    Medium: { bg: 'rgba(246,173,85,0.12)',  color: 'var(--accent-orange)' },
    Low:    { bg: 'rgba(138,155,184,0.12)', color: 'var(--text-secondary)' },
  };
  const s = styles[impact] || styles.Low;
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
      background: s.bg, color: s.color,
    }}>{impact}</span>
  );
};

const EffortBadge = ({ effort }) => (
  <span style={{
    fontSize: 11, padding: '2px 8px', borderRadius: 100,
    background: 'var(--border)', color: 'var(--text-muted)',
  }}>{effort}</span>
);

export const SuggestionsTab = ({ suggestions }) => {
  const [expandedBullet, setExpandedBullet] = useState(null);
  const {
    overallResumeScore,
    summaryRewrite,
    bulletImprovements,
    keywordsToAdd,
    priorityActions,
    formattingTips,
    atsOptimizationTips,
    skillsToHighlight,
  } = suggestions;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Resume Score + Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
        <div className="card fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Resume Quality</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48, fontWeight: 800,
            color: overallResumeScore >= 70 ? 'var(--accent-green)' : 'var(--accent-orange)',
          }}>{overallResumeScore}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>/ 100</div>
        </div>

        <div className="card fade-in">
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>📝 Summary Rewrite</div>
          {summaryRewrite.current && summaryRewrite.current !== 'No summary found' && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>CURRENT</div>
              <div style={{
                fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '2px solid var(--border)',
                lineHeight: 1.6,
              }}>{summaryRewrite.current}</div>
            </div>
          )}
          <div style={{ fontSize: 11, color: 'var(--accent-green)', marginBottom: 4, fontWeight: 600 }}>SUGGESTED</div>
          <div style={{
            fontSize: 14, color: 'var(--text-primary)',
            padding: '10px 12px',
            background: 'rgba(104,211,145,0.05)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '2px solid var(--accent-green)',
            lineHeight: 1.7,
          }}>{summaryRewrite.suggested}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>💡 {summaryRewrite.reason}</div>
        </div>
      </div>

      {/* Priority Actions */}
      {priorityActions?.length > 0 && (
        <div className="card fade-in">
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>🎯 Priority Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {priorityActions.map((action, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text-muted)', minWidth: 28 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{action.action}</span>
                <ImpactBadge impact={action.impact} />
                <EffortBadge effort={action.effort} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bullet Improvements */}
      <div className="card fade-in">
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          ✏️ Bullet Point Rewrites
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bulletImprovements.map((item, i) => (
            <div key={i} style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setExpandedBullet(expandedBullet === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none',
                  border: 'none', cursor: 'pointer', padding: '12px 14px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
                  <span style={{ color: 'var(--accent-red)', marginRight: 8 }}>–</span>
                  {item.original}
                </span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 12 }}>
                  {expandedBullet === i ? '▲' : '▼'}
                </span>
              </button>
              {expandedBullet === i && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ paddingTop: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, marginBottom: 6 }}>IMPROVED</div>
                    <div style={{
                      fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
                      padding: '10px 12px',
                      background: 'rgba(104,211,145,0.05)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2px solid var(--accent-green)',
                    }}>
                      <span style={{ color: 'var(--accent-green)', marginRight: 8 }}>+</span>
                      {item.improved}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                      💡 {item.reason}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <div style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>🔑 Must-Add Keywords</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {keywordsToAdd.mustAdd.map(kw => (
              <span key={kw} className="tag tag-red">{kw}</span>
            ))}
          </div>
        </div>
        <div className="card fade-in">
          <div style={{ fontSize: 11, color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>💡 Should-Add Keywords</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {keywordsToAdd.shouldAdd.map(kw => (
              <span key={kw} className="tag tag-orange">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ATS + Formatting Tips */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <TipsList title="🤖 ATS Optimization" tips={atsOptimizationTips} color="var(--accent-purple)" />
        <TipsList title="📐 Formatting Tips" tips={formattingTips} color="var(--accent-cyan)" />
      </div>
    </div>
  );
};

const TipsList = ({ title, tips, color }) => (
  <div className="card fade-in">
    <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tips?.map((tip, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ color, marginTop: 2, fontSize: 12 }}>▸</span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);