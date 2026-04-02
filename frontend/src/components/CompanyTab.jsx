// src/components/CompanyTab.jsx
import React, { useState } from 'react';

export const CompanyTab = ({ companyIntel }) => {
  const [openSection, setOpenSection] = useState(null);
  const toggle = (id) => setOpenSection(openSection === id ? null : id);

  if (!companyIntel) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>No Company Provided</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Enter a company name in the form to unlock Company Intel — culture insights, interview tips, salary ranges, and more.
        </div>
      </div>
    );
  }

  const { companyOverview, cultureAndEnvironment, interviewProcess, candidateAdvice, salaryAndCompensation, competitorsAndMarket } = companyIntel;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Company Overview */}
      <div className="card fade-in" style={{ borderColor: 'rgba(99,179,237,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>{companyOverview.name}</h2>
              <span className="tag tag-blue">{companyOverview.industry}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              {companyOverview.whatTheyDo}
            </p>
            {companyOverview.mission && (
              <div style={{
                padding: '10px 14px',
                background: 'rgba(99,179,237,0.05)',
                borderLeft: '2px solid var(--accent-blue)',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                fontSize: 13,
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                marginBottom: 16,
              }}>
                "{companyOverview.mission}"
              </div>
            )}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Founded', val: companyOverview.founded },
                { label: 'Size', val: companyOverview.size },
                { label: 'HQ', val: companyOverview.headquarters },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notable facts */}
        {companyOverview.notableAchievements?.length > 0 && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <div className="section-label">Notable Facts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {companyOverview.notableAchievements.map((fact, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-blue)' }}>→</span> {fact}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Culture */}
        <div className="card fade-in">
          <SectionTitle icon="🌱" title="Culture & Environment" color="var(--accent-green)" />
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InfoRow label="Work Style">{cultureAndEnvironment.workStyle}</InfoRow>
            <InfoRow label="Team Culture">{cultureAndEnvironment.teamCulture}</InfoRow>
            <InfoRow label="Work-Life Balance">{cultureAndEnvironment.workLifeBalance}</InfoRow>
            <InfoRow label="Growth">{cultureAndEnvironment.growthOpportunities}</InfoRow>
            {cultureAndEnvironment.values?.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Core Values</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cultureAndEnvironment.values.map(v => <span key={v} className="tag tag-green">{v}</span>)}
                </div>
              </div>
            )}
            <InfoRow label="Employee Sentiment">{cultureAndEnvironment.employeeReview}</InfoRow>
          </div>
        </div>

        {/* Salary */}
        <div className="card fade-in">
          <SectionTitle icon="💰" title="Compensation" color="var(--accent-orange)" />
          <div style={{ marginTop: 14 }}>
            <div style={{
              padding: '16px',
              background: 'rgba(246,173,85,0.06)',
              border: '1px solid rgba(246,173,85,0.2)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              marginBottom: 14,
            }}>
              <div style={{ fontSize: 11, color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Estimated Range</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--accent-orange)' }}>
                {salaryAndCompensation.estimatedRange}
              </div>
            </div>
            {salaryAndCompensation.benefitsKnownFor?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Known Benefits</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {salaryAndCompensation.benefitsKnownFor.map((b, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--accent-orange)' }}>✓</span> {b}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{
              padding: '10px 12px',
              background: 'rgba(104,211,145,0.06)',
              border: '1px solid rgba(104,211,145,0.15)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              color: 'var(--accent-green)',
            }}>
              💡 {salaryAndCompensation.negotiationTip}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Process */}
      <div className="card fade-in">
        <SectionTitle icon="🎯" title="Their Interview Process" color="var(--accent-purple)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
          <div>
            <InfoRow label="Style">{interviewProcess.interviewStyle}</InfoRow>
            <InfoRow label="Difficulty">
              <DifficultyBadge d={interviewProcess.difficulty} />
            </InfoRow>
            <InfoRow label="Duration">{interviewProcess.duration}</InfoRow>
            {interviewProcess.typicalStages?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Typical Stages</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {interviewProcess.typicalStages.map((stage, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'var(--gradient-accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
                      }}>{i + 1}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {interviewProcess.knownForAsking?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Known For Asking</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {interviewProcess.knownForAsking.map(t => <span key={t} className="tag tag-purple">{t}</span>)}
                </div>
              </div>
            )}
            {interviewProcess.tips?.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Tips For You</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {interviewProcess.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent-purple)', flexShrink: 0 }}>▸</span> {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Advice */}
      <div className="card fade-in" style={{ borderColor: 'rgba(104,211,145,0.2)' }}>
        <SectionTitle icon="🧭" title="Your Game Plan" color="var(--accent-cyan)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
          <div>
            <InfoRow label="Why You Fit This Company">{candidateAdvice.whyYouFit}</InfoRow>
            <InfoRow label="What To Emphasize">{candidateAdvice.angleToEmphasize}</InfoRow>
            {candidateAdvice.researchTopics?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Research Before Interview</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {candidateAdvice.researchTopics.map((t, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--accent-cyan)' }}>📌</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {candidateAdvice.questionsToAsk?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Smart Questions To Ask Them</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {candidateAdvice.questionsToAsk.map((q, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '8px 10px', background: 'rgba(104,211,145,0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--accent-green)' }}>
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {candidateAdvice.greenFlags?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>🟢 Green Flags</div>
                  {candidateAdvice.greenFlags.map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>✓ {f}</div>
                  ))}
                </div>
              )}
              {candidateAdvice.redFlags?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--accent-red)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>🔴 Red Flags</div>
                  {candidateAdvice.redFlags.map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>⚠ {f}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Market Position */}
      {competitorsAndMarket && (
        <div className="card fade-in">
          <SectionTitle icon="📊" title="Market Position" color="var(--accent-blue)" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
            <div>
              <InfoRow label="Market Position">{competitorsAndMarket.marketPosition}</InfoRow>
              <InfoRow label="Recent News">{competitorsAndMarket.recentNews}</InfoRow>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Main Competitors</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {competitorsAndMarket.mainCompetitors?.map(c => <span key={c} className="tag tag-blue">{c}</span>)}
              </div>
            </div>
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
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{children}</div>
  </div>
);

const DifficultyBadge = ({ d }) => {
  const map = { Easy: 'tag-green', Medium: 'tag-blue', Hard: 'tag-orange', 'Very Hard': 'tag-red' };
  return <span className={`tag ${map[d] || 'tag-blue'}`}>{d}</span>;
};