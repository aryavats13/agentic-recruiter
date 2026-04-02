// agents/resumeAnalyzer.js
// Agent 1: Extracts structured candidate profile from raw resume text

const { generateJSON } = require('../utils/geminiClient');

/**
 * Analyzes raw resume text and extracts a structured candidate profile.
 * @param {string} resumeText — Raw text extracted from PDF
 * @returns {Promise<object>} — Structured candidate profile
 */
const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert resume parser. Extract a structured profile from the resume text below.

RESUME TEXT:
"""
${resumeText}
"""

Return ONLY valid JSON matching this exact schema (no explanation, no markdown):
{
  "name": "string — candidate full name or 'Not Found'",
  "email": "string — email address or null",
  "phone": "string — phone number or null",
  "location": "string — city/country or null",
  "summary": "string — 2-3 sentence professional summary extracted or inferred",
  "totalExperienceYears": "number — estimated years of total experience",
  "currentRole": "string — most recent job title or null",
  "skills": {
    "technical": ["array of technical skills, tools, languages, frameworks"],
    "soft": ["array of soft skills like leadership, communication"],
    "certifications": ["array of certifications or empty array"]
  },
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string or null"
    }
  ],
  "workExperience": [
    {
      "title": "string",
      "company": "string",
      "duration": "string",
      "bullets": ["array of original bullet points from resume"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string"
    }
  ]
}
`;

  return generateJSON(prompt);
};

module.exports = { analyzeResume };