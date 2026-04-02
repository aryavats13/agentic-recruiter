// src/components/InterviewTab.jsx
import React, { useState } from 'react';

const DifficultyBadge = ({ difficulty }) => {
  const map = {
    Easy:   { bg: 'rgba(104,211,145,0.12)', color: 'var(--accent-green)' },
    Medium: { bg: 'rgba(246,173,85,0.12)',  color: 'var(--accent-orange)' },
    Hard:   { bg: 'rgba(252,129,129,0.12)', color: 'var(--accent-red)' },
  };
  const s = map[difficulty] || map.Medium;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: s.bg, color: s.color }}>
      {difficulty}
    </span>
  );
};

export const InterviewTab = ({ interviewGuide }) => {
  const [openQ, setOpenQ] = useState(null);
  const toggle = (id) => setOpenQ(openQ === id ? null : id);

  const {
    interviewDuration,
    interviewFormat,
    technicalQuestions,
    behavioralQuestions,
    gapProbeQuestions,
    scoringRubric,
  } = interviewGuide;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {[
          { icon: '⏱', label: 'Duration', val: interviewDuration },
          { icon: '📋', label: 'Format', val: interviewFormat },
          { icon: '🔢', label: 'Technical Qs', val: technicalQuestions.length },
          { icon: '💬', label: 'Behavioral Qs', val: behavioralQuestions.length },
        ].map(({ icon, label, val }) => (
          <div key={label} className="card fade-in" style={{ textAlign: 'center', padding: 18 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Technical Questions */}
      <div className="card fade-in">
        <SectionTitle icon="💻" title="Technical Questions" color="var(--accent-blue)" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {technicalQuestions.map((q, i) => (
            <QuestionAccordion
              key={i}
              id={`tech-${i}`}
              open={openQ === `tech-${i}`}
              onToggle={() => toggle(`tech-${i}`)}
              question={q.question}
              headerExtras={
                <>
                  <span className="tag tag-blue" style={{ fontSize: 10 }}>{q.category}</span>
                  <DifficultyBadge difficulty={q.difficulty} />
                </>
              }
            >
              <InfoRow label="Targets">{q.targetedAt}</InfoRow>
              <InfoRow label="Strong answer includes">
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {q.goodAnswerIndicators.map((ind, j) => <li key={j} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 3 }}>{ind}</li>)}
                </ul>
              </InfoRow>
              {q.followUps?.length > 0 && (
                <InfoRow label="Follow-ups">
                  {q.followUps.map((f, j) => (
                    <div key={j} style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>↪ {f}</div>
                  ))}
                </InfoRow>
              )}
            </QuestionAccordion>
          ))}
        </div>
      </div>

      {/* Behavioral Questions */}
      <div className="card fade-in">
        <SectionTitle icon="🎭" title="Behavioral Questions" color="var(--accent-purple)" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {behavioralQuestions.map((q, i) => (
            <QuestionAccordion
              key={i}
              id={`beh-${i}`}
              open={openQ === `beh-${i}`}
              onToggle={() => toggle(`beh-${i}`)}
              question={q.question}
            >
              <InfoRow label="Assesses">{q.targetedAt}</InfoRow>
              {q.greenFlags?.length > 0 && (
                <InfoRow label="🟢 Green Flags">
                  {q.greenFlags.map((f, j) => <div key={j} style={{ fontSize: 13, color: 'var(--accent-green)', marginBottom: 3 }}>✓ {f}</div>)}
                </InfoRow>
              )}
              {q.redFlags?.length > 0 && (
                <InfoRow label="🔴 Red Flags">
                  {q.redFlags.map((f, j) => <div key={j} style={{ fontSize: 13, color: 'var(--accent-red)', marginBottom: 3 }}>✗ {f}</div>)}
                </InfoRow>
              )}
            </QuestionAccordion>
          ))}
        </div>
      </div>

      {/* Gap Probe Questions */}
      {gapProbeQuestions?.length > 0 && (
        <div className="card fade-in">
          <SectionTitle icon="🔎" title="Gap Probe Questions" color="var(--accent-orange)" />
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 14px' }}>Targeted questions to investigate identified skill gaps</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {gapProbeQuestions.map((q, i) => (
              <QuestionAccordion
                key={i}
                id={`gap-${i}`}
                open={openQ === `gap-${i}`}
                onToggle={() => toggle(`gap-${i}`)}
                question={q.question}
                headerExtras={<span className="tag tag-orange" style={{ fontSize: 10 }}>{q.gap}</span>}
              >
                <InfoRow label="Purpose">{q.purpose}</InfoRow>
              </QuestionAccordion>
            ))}
          </div>
        </div>
      )}

      {/* Scoring Rubric */}
      {scoringRubric && (
        <div className="card fade-in" style={{ borderColor: 'rgba(159,122,234,0.2)' }}>
          <SectionTitle icon="📊" title="Hiring Decision Rubric" color="var(--accent-purple)" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
            {Object.entries(scoringRubric).map(([key, val]) => {
              const labels = {
                technicalFit: 'Technical Fit',
                culturalFit: 'Cultural Fit',
                growthPotential: 'Growth Potential',
                decisionGuidance: 'Hire/Pass Guidance',
              };
              return (
                <div key={key} style={{
                  padding: '12px 14px',
                  background: 'var(--bg-input)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-purple)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {labels[key] || key}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{val}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ icon, title, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span>{icon}</span>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color }}>{title}</span>
  </div>
);

const InfoRow = ({ label, children }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{children}</div>
  </div>
);

const QuestionAccordion = ({ id, open, onToggle, question, headerExtras, children }) => (
  <div style={{
    border: `1px solid ${open ? 'var(--border-active)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
  }}>
    <button
      onClick={onToggle}
      style={{
        width: '100%', textAlign: 'left', background: open ? 'rgba(99,179,237,0.04)' : 'none',
        border: 'none', cursor: 'pointer', padding: '12px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
        transition: 'background 0.2s ease',
      }}
    >
      <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5, flex: 1 }}>{question}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {headerExtras}
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
      </div>
    </button>
    {open && (
      <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        {children}
      </div>
    )}
  </div>
);