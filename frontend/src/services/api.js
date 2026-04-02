// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const analyzeResume = async (resumeFile, jobDescription, companyName, onProgress) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);
  if (companyName && companyName.trim()) {
    formData.append('companyName', companyName.trim());
  }

  let progressInterval;
  if (onProgress) {
    let fakeProgress = 0;
    progressInterval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + Math.random() * 6, 90);
      onProgress(Math.round(fakeProgress));
    }, 800);
  }

  try {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Server error: ${response.status}`);
    if (onProgress) onProgress(100);
    return data;
  } finally {
    if (progressInterval) clearInterval(progressInterval);
  }
};

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE}/health`);
  return response.json();
};