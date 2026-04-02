// src/components/ResultsPanel.jsx
import React from 'react';
import { ScoreCard } from './ScoreCard';
import { MatchTab } from './MatchTab';
import { SuggestionsTab } from './SuggestionsTab';
import { InterviewTab } from './InterviewTab';

const TABS = [
  { id: 'match',       label: '🎯 Match Analysis' },
  { id: 'suggestions', label: '✏️ Optimize Resume' },
  { id: 'interview',   label: '💬 Interview Guide' },
];

export const ResultsPanel = ({ result, activeTab, setActiveTab }) => {
  const { candidateProfile, matchResult, suggestions, interviewGuide, processingTimeSeconds, meta } = result;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Score Overview Card */}
      <ScoreCard
        matchResult={matchResult}
        candidateProfile={candidateProfile}
        processingTime={processingTimeSeconds}
      />

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: 4,
        background: 'var(--bg-card)',
        padding: 4,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 13,
              transition: 'all 0.2s ease',
              background: activeTab === tab.id
                ? 'var(--gradient-accent)'
                : 'transparent',
              color: activeTab === tab.id
                ? '#fff'
                : 'var(--text-secondary)',
              boxShadow: activeTab === tab.id
                ? '0 2px 12px rgba(99,179,237,0.3)'
                : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'match' && <MatchTab matchResult={matchResult} />}
        {activeTab === 'suggestions' && <SuggestionsTab suggestions={suggestions} />}
        {activeTab === 'interview' && <InterviewTab interviewGuide={interviewGuide} />}
      </div>
    </div>
  );
};