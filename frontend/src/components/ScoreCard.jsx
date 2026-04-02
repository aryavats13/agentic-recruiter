// src/components/ScoreCard.jsx
import React from 'react';

const getScoreColor = (score) => {
  if (score >= 80) return 'var(--score-strong)';
  if (score >= 60) return 'var(--score-good)';
  return 'var(--score-partial)';
};

const getVerdictStyle = (verdict) => {
  const map = {
    'Strong Match': 'tag-green',
    'Good Match':   'tag-blue',
    'Partial Match':'tag-orange',
    'Weak Match':   'tag-red',
  };
  return map[verdict] || 'tag-neutral';
};

export const ScoreCard = ({ matchResult, candidateProfile, processingTime }) => {
  const { matchScore, verdict, verdictReason, scoreBreakdown } = matchResult;
  const scoreColor = getScoreColor(matchScore);
  const r = 48;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="card fade-in" style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>

        {/* Score gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 112, height: 112 }}>
            <svg width="112" height="112" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="56" cy="56" r={r}
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 56 56)"
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28, fontWeight: 700,
                color: scoreColor,
                lineHeight: 1,
              }}>{matchScore}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>/100</div>
            </div>
          </div>
          <span className={`tag ${getVerdictStyle(verdict)}`}>{verdict}</span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{candidateProfile.name}</h2>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {candidateProfile.currentRole}
              {candidateProfile.totalExperienceYears > 0 && ` · ${candidateProfile.totalExperienceYears} yr${candidateProfile.totalExperienceYears !== 1 ? 's' : ''} experience`}
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, maxWidth: 540 }}>
            {verdictReason}
          </p>

          {/* Score breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
            {Object.entries(scoreBreakdown).map(([key, val]) => {
              const meta = {
                skillsMatch:     { label: 'Skills Match',   max: 40 },
                experienceMatch: { label: 'Experience',     max: 30 },
                educationMatch:  { label: 'Education',      max: 15 },
                overallFit:      { label: 'Overall Fit',    max: 15 },
              };
              const { label, max } = meta[key] || { label: key, max: 100 };
              const pct = Math.round((val / max) * 100);
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{val}<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/{max}</span></span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: scoreColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meta */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          paddingLeft: 24,
          borderLeft: '1px solid var(--border)',
          minWidth: 140,
          flexShrink: 0,
        }}>
          {[
            { label: 'Email', val: candidateProfile.email || '—' },
            { label: 'Location', val: candidateProfile.location || '—' },
            { label: 'Education', val: candidateProfile.education?.[0]?.degree || '—' },
            { label: 'Processed in', val: `${processingTime}s` },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="info-label">{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, wordBreak: 'break-all' }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};