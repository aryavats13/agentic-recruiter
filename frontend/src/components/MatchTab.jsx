// src/components/MatchTab.jsx
import React from 'react';

export const MatchTab = ({ matchResult }) => {
  const { matchingSkills, missingSkills, strengths, concerns, experienceGap } = matchResult;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Matching Skills */}
      <div className="card fade-in">
        <SectionTitle icon="✅" label="Matching Skills" count={matchingSkills.length} color="var(--accent-green)" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {matchingSkills.map(skill => (
            <span key={skill} className="tag tag-green">{skill}</span>
          ))}
          {matchingSkills.length === 0 && <Empty>No matching skills found.</Empty>}
        </div>
      </div>

      {/* Missing Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <SectionTitle icon="🚫" label="Critical Gaps" count={missingSkills.critical.length} color="var(--accent-red)" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Required — will likely block shortlisting</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {missingSkills.critical.map(skill => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--accent-red)', fontSize: 12 }}>●</span>
                <span style={{ fontSize: 14 }}>{skill}</span>
              </div>
            ))}
            {missingSkills.critical.length === 0 && <Empty>No critical gaps — great fit!</Empty>}
          </div>
        </div>

        <div className="card fade-in">
          <SectionTitle icon="⚠️" label="Preferred Gaps" count={missingSkills.preferred.length} color="var(--accent-orange)" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Nice-to-have — won't block but are advantageous</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {missingSkills.preferred.map(skill => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--accent-orange)', fontSize: 12 }}>●</span>
                <span style={{ fontSize: 14 }}>{skill}</span>
              </div>
            ))}
            {missingSkills.preferred.length === 0 && <Empty>No preferred skill gaps.</Empty>}
          </div>
        </div>
      </div>

      {/* Strengths & Concerns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card fade-in">
          <SectionTitle icon="💪" label="Strengths" color="var(--accent-cyan)" />
          <ul style={{ paddingLeft: 0, listStyle: 'none', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {strengths.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-cyan)', marginTop: 1 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card fade-in">
          <SectionTitle icon="⚡" label="Concerns" color="var(--accent-orange)" />
          <ul style={{ paddingLeft: 0, listStyle: 'none', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-orange)', marginTop: 1 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience Gap */}
      {experienceGap && (
        <div className="card fade-in" style={{ borderColor: 'rgba(99,179,237,0.2)' }}>
          <SectionTitle icon="📅" label="Experience Analysis" color="var(--accent-blue)" />
          <p style={{ marginTop: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{experienceGap}</p>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ icon, label, count, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span>{icon}</span>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{label}</span>
    {count !== undefined && (
      <span style={{
        fontSize: 11, fontWeight: 700,
        background: `${color}18`,
        color,
        padding: '2px 7px',
        borderRadius: 100,
      }}>{count}</span>
    )}
  </div>
);

const Empty = ({ children }) => (
  <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{children}</p>
);