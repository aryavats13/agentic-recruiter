// src/components/MatchTab.jsx
import React from 'react';

export const MatchTab = ({ matchResult }) => {
  const { matchingSkills, missingSkills, strengths, concerns, experienceGap } = matchResult;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Matching Skills */}
      <div className="card fade-in">
        <SectionHeader label="Matching Skills" count={matchingSkills.length} color="var(--accent-green)" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {matchingSkills.map(skill => <span key={skill} className="tag tag-green">{skill}</span>)}
          {!matchingSkills.length && <Empty>No matching skills identified.</Empty>}
        </div>
      </div>

      {/* Skill Gaps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <SectionHeader label="Critical Gaps" count={missingSkills.critical.length} color="var(--accent-red)" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 12px' }}>Required skills — may block shortlisting</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {missingSkills.critical.map(skill => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-red)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{skill}</span>
              </div>
            ))}
            {!missingSkills.critical.length && <Empty>No critical gaps — strong match.</Empty>}
          </div>
        </div>

        <div className="card fade-in">
          <SectionHeader label="Preferred Gaps" count={missingSkills.preferred.length} color="var(--accent-orange)" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 12px' }}>Nice-to-have — will not block but are advantageous</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {missingSkills.preferred.map(skill => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-orange)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{skill}</span>
              </div>
            ))}
            {!missingSkills.preferred.length && <Empty>No preferred skill gaps.</Empty>}
          </div>
        </div>
      </div>

      {/* Strengths & Concerns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <SectionHeader label="Strengths" color="var(--accent-green)" />
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {strengths.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M2 7l3.5 3.5L12 3.5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card fade-in">
          <SectionHeader label="Concerns" color="var(--accent-orange)" />
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M7 1a6 6 0 100 12A6 6 0 007 1zM7 4v3M7 9v1" stroke="var(--accent-orange)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience gap */}
      {experienceGap && (
        <div className="card fade-in">
          <SectionHeader label="Experience Analysis" color="var(--accent-blue)" />
          <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{experienceGap}</p>
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ label, count, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>{label}</span>
    {count !== undefined && (
      <span style={{ fontSize: 11, fontWeight: 700, background: `color-mix(in srgb, ${color} 10%, transparent)`, color, padding: '1px 7px', borderRadius: 3 }}>{count}</span>
    )}
  </div>
);

const Empty = ({ children }) => (
  <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{children}</p>
);