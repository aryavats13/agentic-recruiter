// src/components/InterviewTab.jsx
import React, { useState } from 'react';

const DifficultyBadge = ({ difficulty }) => {
  const map = { Easy: 'tag-green', Medium: 'tag-blue', Hard: 'tag-orange', 'Very Hard': 'tag-red' };
  return <span className={`tag ${map[difficulty] || 'tag-neutral'}`}>{difficulty}</span>;
};

const Chevron = ({ open }) => (
  <svg className={`chevron${open ? ' chevron--open' : ''}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuestionBlock = ({ id, open, onToggle, question, badges, children }) => (
  <div className={`accordion-item${open ? ' accordion-item--open' : ''}`}>
    <button className="accordion-trigger" onClick={onToggle}>
      <span style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.55, flex: 1, fontWeight: 500 }}>{question}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {badges}
        <Chevron open={open} />
      </div>
    </button>
    {open && (
      <div className="accordion-content" style={{ paddingTop: 14 }}>
        {children}
      </div>
    )}
  </div>
);

export const InterviewTab = ({ interviewGuide }) => {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);
  const { interviewDuration, interviewFormat, technicalQuestions, behavioralQuestions, gapProbeQuestions, scoringRubric } = interviewGuide;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { label: 'Duration', val: interviewDuration },
          { label: 'Format', val: interviewFormat },
          { label: 'Technical Questions', val: technicalQuestions.length },
          { label: 'Behavioral Questions', val: behavioralQuestions.length },
        ].map(({ label, val }) => (
          <div key={label} className="stat-block">
            <div className="info-label">{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Technical */}
      <div className="card fade-in">
        <SectionTitle label="Technical Questions" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
          {technicalQuestions.map((q, i) => (
            <QuestionBlock
              key={i} id={`t${i}`} open={open === `t${i}`}
              onToggle={() => toggle(`t${i}`)}
              question={q.question}
              badges={<>
                <span className="tag tag-neutral" style={{ fontSize: 10 }}>{q.category}</span>
                <DifficultyBadge difficulty={q.difficulty} />
              </>}
            >
              <InfoRow label="Targets">{q.targetedAt}</InfoRow>
              <InfoRow label="Strong answer includes">
                <ul style={{ paddingLeft: 14, margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {q.goodAnswerIndicators.map((ind, j) => <li key={j} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ind}</li>)}
                </ul>
              </InfoRow>
              {q.followUps?.length > 0 && (
                <InfoRow label="Follow-up questions">
                  {q.followUps.map((f, j) => (
                    <div key={j} style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>— {f}</div>
                  ))}
                </InfoRow>
              )}
            </QuestionBlock>
          ))}
        </div>
      </div>

      {/* Behavioral */}
      <div className="card fade-in">
        <SectionTitle label="Behavioral Questions" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
          {behavioralQuestions.map((q, i) => (
            <QuestionBlock
              key={i} id={`b${i}`} open={open === `b${i}`}
              onToggle={() => toggle(`b${i}`)}
              question={q.question}
            >
              <InfoRow label="Assesses">{q.targetedAt}</InfoRow>
              {q.greenFlags?.length > 0 && (
                <InfoRow label="Positive indicators">
                  {q.greenFlags.map((f, j) => <div key={j} style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 3 }}>+ {f}</div>)}
                </InfoRow>
              )}
              {q.redFlags?.length > 0 && (
                <InfoRow label="Concerning responses">
                  {q.redFlags.map((f, j) => <div key={j} style={{ fontSize: 12, color: 'var(--accent-red)', marginTop: 3 }}>— {f}</div>)}
                </InfoRow>
              )}
            </QuestionBlock>
          ))}
        </div>
      </div>

      {/* Gap Probe */}
      {gapProbeQuestions?.length > 0 && (
        <div className="card fade-in">
          <SectionTitle label="Gap Probe Questions" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 14px' }}>Targeted questions to investigate identified skill gaps</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {gapProbeQuestions.map((q, i) => (
              <QuestionBlock
                key={i} id={`g${i}`} open={open === `g${i}`}
                onToggle={() => toggle(`g${i}`)}
                question={q.question}
                badges={<span className="tag tag-orange" style={{ fontSize: 10 }}>{q.gap}</span>}
              >
                <InfoRow label="Purpose">{q.purpose}</InfoRow>
              </QuestionBlock>
            ))}
          </div>
        </div>
      )}

      {/* Rubric */}
      {scoringRubric && (
        <div className="card fade-in">
          <SectionTitle label="Hiring Decision Rubric" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            {Object.entries(scoringRubric).map(([key, val]) => {
              const labels = {
                technicalFit:     'Technical Fit — What They Evaluate',
                culturalFit:      'Cultural Fit — What They Look For',
                growthPotential:  'Growth Potential — How to Demonstrate',
                decisionGuidance: 'How to Get the Offer',
              };
              return (
                <div key={key} className="stat-block">
                  <div className="info-label" style={{ marginBottom: 6 }}>{labels[key] || key}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{val}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ label }) => (
  <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>{label}</div>
);

const InfoRow = ({ label, children }) => (
  <div style={{ marginBottom: 10 }}>
    <div className="info-label">{label}</div>
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 3 }}>{children}</div>
  </div>
);