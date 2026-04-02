// src/hooks/useAnalysis.js
import { useState, useCallback } from 'react';
import { analyzeResume } from '../services/api';

const INITIAL_STATE = {
  status: 'idle',
  progress: 0,
  result: null,
  error: null,
  activeTab: 'match',
};

export const useAnalysis = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateState = (patch) => setState(prev => ({ ...prev, ...patch }));

  const analyze = useCallback(async (resumeFile, jobDescription, companyName) => {
    updateState({ status: 'analyzing', progress: 5, error: null, result: null });
    try {
      const result = await analyzeResume(
        resumeFile,
        jobDescription,
        companyName,
        (progress) => updateState({ progress })
      );
      updateState({ status: 'done', result, progress: 100 });
    } catch (err) {
      updateState({
        status: 'error',
        error: err.message || 'An unexpected error occurred.',
        progress: 0,
      });
    }
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);
  const setActiveTab = useCallback((tab) => updateState({ activeTab: tab }), []);

  return {
    ...state,
    analyze,
    reset,
    setActiveTab,
    isLoading: state.status === 'analyzing',
  };
};