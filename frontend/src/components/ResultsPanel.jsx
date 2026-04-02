// src/components/ResultsPanel.jsx
import React from 'react';
import { ScoreCard } from './ScoreCard';
import { MatchTab } from './MatchTab';
import { SuggestionsTab } from './SuggestionsTab';
import { InterviewTab } from './InterviewTab';
import { CompanyTab } from './CompanyTab';

const TABS = [
  { id: 'match',       label: 'Match Analysis' },
  { id: 'suggestions', label: 'Optimize Resume' },
  { id: 'interview',   label: 'Interview Guide' },
  { id: 'company',     label: 'Company Intel' },
];

export const ResultsPanel = ({ result, activeTab, setActiveTab }) => {
  const { candidateProfile, matchResult, suggestions, interviewGuide, companyIntel, processingTimeSeconds, meta } = result;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ScoreCard matchResult={matchResult} candidateProfile={candidateProfile} processingTime={processingTimeSeconds} />

      {/* Tab bar */}
      <div className="tab-bar">
        {TABS.map(tab => {
          const isDisabled = tab.id === 'company' && !companyIntel;
          return (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? ' tab-btn--active' : ''}`}
              onClick={() => !isDisabled && setActiveTab(tab.id)}
              disabled={isDisabled}
              title={isDisabled ? 'Enter a company name to unlock' : undefined}
            >
              {tab.label}
              {isDisabled && (
                <span style={{ display: 'block', fontSize: 10, opacity: 0.5, fontWeight: 400, marginTop: 1 }}>
                  add company name
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'match'       && <MatchTab matchResult={matchResult} />}
        {activeTab === 'suggestions' && <SuggestionsTab suggestions={suggestions} />}
        {activeTab === 'interview'   && <InterviewTab interviewGuide={interviewGuide} />}
        {activeTab === 'company'     && <CompanyTab companyIntel={companyIntel} />}
      </div>
    </div>
  );
};