// src/components/ScoreCard.jsx
import React from 'react';

const getScoreColor = (score) => {
  if (score >= 80) return 'var(--score-strong)';
  if (score >= 60) return 'var(--score-good)';
  return 'var(--score-partial)';
};

const getVerdictTag = (verdict) => {
  const map = {
    'Strong Match': 'tag-green',
    'Good Match': 'tag-blue',
    'Partial Match': 'tag-orange',
    'Weak Match': 'tag-red',
  };
  return map[verdict] || 'tag-blue';
};

export const ScoreCard = ({ matchResult, candidateProfile, processingTime }) => {
  const { matchScore, verdict, verdictReason, scoreBreakdown } = matchResult;
  const scoreColor = getScoreColor(matchScore);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="card fade-in" style={{
      background: 'linear-gradient(145deg, #141b2d, #0d1220)',
      borderColor: `${scoreColor}30`,
      boxShadow: `0 4px 40px ${scoreColor}20`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>

        {/* Circular Score */}
        <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54"
              fill="none" stroke="var(--border)" strokeWidth="10" />
            <circle cx="64" cy="64" r="54"
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 64 64)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30, fontWeight: 800,
              color: scoreColor,
              lineHeight: 1,
            }}>{matchScore}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>/100</div>
          </div>
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
              {candidateProfile.name}
            </h2>
            <span className={`tag ${getVerdictTag(verdict)}`}>{verdict}</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
            {candidateProfile.currentRole} · {candidateProfile.totalExperienceYears} yrs exp
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            {verdictReason}
          </p>

          {/* Breakdown bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {Object.entries(scoreBreakdown).map(([key, val]) => {
              const labels = {
                skillsMatch: { label: 'Skills', max: 40 },
                experienceMatch: { label: 'Experience', max: 30 },
                educationMatch: { label: 'Education', max: 15 },
                overallFit: { label: 'Overall Fit', max: 15 },
              };
              const { label, max } = labels[key] || { label: key, max: 100 };
              const pct = Math.round((val / max) * 100);
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
                    <span style={{ color: scoreColor, fontWeight: 700 }}>{val}/{max}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: scoreColor, borderRadius: 2,
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 20, paddingTop: 16,
        borderTop: '1px solid var(--border)',
        display: 'flex', gap: 16, flexWrap: 'wrap',
      }}>
        {[
          { label: 'Email', val: candidateProfile.email || '—' },
          { label: 'Location', val: candidateProfile.location || '—' },
          { label: 'Education', val: candidateProfile.education?.[0]?.degree || '—' },
          { label: 'Processed in', val: `${processingTime}s` },
        ].map(({ label, val }) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};