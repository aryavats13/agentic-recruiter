// src/components/CompanyTab.jsx
import React from 'react';

export const CompanyTab = ({ companyIntel }) => {
  if (!companyIntel) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '56px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8 }}>No Company Provided</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Enter a company name in the form to unlock Company Intel — culture, interview style, salary, and your game plan.
        </div>
      </div>
    );
  }

  const { companyOverview, cultureAndEnvironment, interviewProcess, candidateAdvice, salaryAndCompensation, competitorsAndMarket } = companyIntel;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Overview */}
      <div className="card fade-in">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{companyOverview.name}</h2>
              <span className="tag tag-neutral">{companyOverview.industry}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
              {companyOverview.whatTheyDo}
            </p>
            {companyOverview.mission && (
              <div style={{
                padding: '10px 14px',
                background: 'var(--bg-subtle)',
                borderLeft: '3px solid var(--border-active)',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                fontSize: 13,
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                marginBottom: 16,
              }}>"{companyOverview.mission}"</div>
            )}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Founded', val: companyOverview.founded },
                { label: 'Size', val: companyOverview.size },
                { label: 'Headquarters', val: companyOverview.headquarters },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="info-label">{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {companyOverview.notableAchievements?.length > 0 && (
            <div style={{ minWidth: 220, maxWidth: 280 }}>
              <div className="info-label" style={{ marginBottom: 10 }}>Notable Facts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {companyOverview.notableAchievements.map((fact, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 7, flexShrink: 0 }} />
                    {fact}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Culture */}
        <div className="card fade-in">
          <SectionTitle label="Culture & Environment" />
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InfoRow label="Work Style">{cultureAndEnvironment.workStyle}</InfoRow>
            <InfoRow label="Team Culture">{cultureAndEnvironment.teamCulture}</InfoRow>
            <InfoRow label="Work-Life Balance">{cultureAndEnvironment.workLifeBalance}</InfoRow>
            <InfoRow label="Career Growth">{cultureAndEnvironment.growthOpportunities}</InfoRow>
            {cultureAndEnvironment.values?.length > 0 && (
              <div>
                <div className="info-label" style={{ marginBottom: 7 }}>Core Values</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {cultureAndEnvironment.values.map(v => <span key={v} className="tag tag-neutral">{v}</span>)}
                </div>
              </div>
            )}
            <InfoRow label="Employee Sentiment">{cultureAndEnvironment.employeeReview}</InfoRow>
          </div>
        </div>

        {/* Salary */}
        <div className="card fade-in">
          <SectionTitle label="Compensation" />
          <div style={{ marginTop: 14 }}>
            <div className="stat-block" style={{ textAlign: 'center', marginBottom: 14 }}>
              <div className="info-label" style={{ marginBottom: 6 }}>Estimated Salary Range</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
                {salaryAndCompensation.estimatedRange}
              </div>
            </div>
            {salaryAndCompensation.benefitsKnownFor?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div className="info-label" style={{ marginBottom: 7 }}>Known Benefits</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {salaryAndCompensation.benefitsKnownFor.map((b, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                        <path d="M2 6l2.5 2.5L10 3.5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{
              padding: '10px 12px',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--border-active)',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>Negotiation tip:</strong> {salaryAndCompensation.negotiationTip}
            </div>
          </div>
        </div>
      </div>

      {/* Interview process */}
      <div className="card fade-in">
        <SectionTitle label="Their Interview Process" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 14 }}>
          <div>
            <InfoRow label="Style">{interviewProcess.interviewStyle}</InfoRow>
            <InfoRow label="Difficulty">
              <DiffBadge d={interviewProcess.difficulty} />
            </InfoRow>
            <InfoRow label="Timeline">{interviewProcess.duration}</InfoRow>
            {interviewProcess.typicalStages?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div className="info-label" style={{ marginBottom: 10 }}>Typical Stages</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {interviewProcess.typicalStages.map((stage, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'var(--text-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: 'var(--text-inverse)', flexShrink: 0,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {interviewProcess.knownForAsking?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div className="info-label" style={{ marginBottom: 7 }}>Known For Asking About</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {interviewProcess.knownForAsking.map(t => <span key={t} className="tag tag-neutral">{t}</span>)}
                </div>
              </div>
            )}
            {interviewProcess.tips?.length > 0 && (
              <div>
                <div className="info-label" style={{ marginBottom: 7 }}>Tips Specific to This Company</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {interviewProcess.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 6, flexShrink: 0 }} />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Your game plan */}
      <div className="card fade-in">
        <SectionTitle label="Your Game Plan" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 14 }}>
          <div>
            <InfoRow label="Why You Fit This Company">{candidateAdvice.whyYouFit}</InfoRow>
            <InfoRow label="What to Emphasize">{candidateAdvice.angleToEmphasize}</InfoRow>
            {candidateAdvice.researchTopics?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div className="info-label" style={{ marginBottom: 7 }}>Research Before Interview</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {candidateAdvice.researchTopics.map((t, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 6, flexShrink: 0 }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {candidateAdvice.questionsToAsk?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div className="info-label" style={{ marginBottom: 7 }}>Questions to Ask Them</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {candidateAdvice.questionsToAsk.map((q, i) => (
                    <div key={i} style={{
                      fontSize: 13, color: 'var(--text-secondary)',
                      padding: '8px 10px',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2px solid var(--border)',
                    }}>"{q}"</div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {candidateAdvice.greenFlags?.length > 0 && (
                <div className="stat-block">
                  <div className="info-label" style={{ color: 'var(--accent-green)', marginBottom: 7 }}>Green Flags</div>
                  {candidateAdvice.greenFlags.map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>+ {f}</div>
                  ))}
                </div>
              )}
              {candidateAdvice.redFlags?.length > 0 && (
                <div className="stat-block">
                  <div className="info-label" style={{ color: 'var(--accent-red)', marginBottom: 7 }}>Red Flags</div>
                  {candidateAdvice.redFlags.map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>— {f}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Market */}
      {competitorsAndMarket && (
        <div className="card fade-in">
          <SectionTitle label="Market Position" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
            <div>
              <InfoRow label="Market Position">{competitorsAndMarket.marketPosition}</InfoRow>
              <InfoRow label="Recent Developments">{competitorsAndMarket.recentNews}</InfoRow>
            </div>
            <div>
              <div className="info-label" style={{ marginBottom: 7 }}>Main Competitors</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {competitorsAndMarket.mainCompetitors?.map(c => <span key={c} className="tag tag-neutral">{c}</span>)}
              </div>
            </div>
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
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 3 }}>{children}</div>
  </div>
);

const DiffBadge = ({ d }) => {
  const map = { Easy: 'tag-green', Medium: 'tag-blue', Hard: 'tag-orange', 'Very Hard': 'tag-red' };
  return <span className={`tag ${map[d] || 'tag-neutral'}`}>{d}</span>;
};