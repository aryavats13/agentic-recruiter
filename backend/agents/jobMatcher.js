// agents/jobMatcher.js
// Agent 2: Scores candidate against job description, identifies skill gaps

const { generateJSON } = require('../utils/geminiClient');

/**
 * Compares a candidate profile to a job description and produces a match score.
 * @param {object} candidateProfile — Output from resumeAnalyzer agent
 * @param {string} jobDescription — Raw job description text
 * @returns {Promise<object>} — Match evaluation with score and skill gaps
 */
const matchCandidateToJob = async (candidateProfile, jobDescription) => {
  const prompt = `
You are a senior technical recruiter evaluating a candidate for a specific job opening.

CANDIDATE PROFILE:
${JSON.stringify(candidateProfile, null, 2)}

JOB DESCRIPTION:
"""
${jobDescription}
"""

Evaluate the candidate comprehensively and return ONLY valid JSON matching this exact schema:
{
  "matchScore": "integer 0-100 — overall fit score",
  "scoreBreakdown": {
    "skillsMatch": "integer 0-40 — out of 40 points",
    "experienceMatch": "integer 0-30 — out of 30 points",
    "educationMatch": "integer 0-15 — out of 15 points",
    "overallFit": "integer 0-15 — cultural/domain fit, out of 15 points"
  },
  "verdict": "string — one of: 'Strong Match', 'Good Match', 'Partial Match', 'Weak Match'",
  "verdictReason": "string — 2-3 sentence explanation of the score",
  "matchingSkills": ["array of skills candidate has that the job requires"],
  "missingSkills": {
    "critical": ["skills explicitly required that candidate lacks — blockers"],
    "preferred": ["skills listed as preferred/nice-to-have that candidate lacks"]
  },
  "experienceGap": "string — brief analysis of experience alignment or gaps",
  "strengths": ["array of 3-5 specific candidate strengths relevant to this role"],
  "concerns": ["array of 2-4 potential red flags or gaps for this specific role"]
}

Scoring guide:
- 80-100: Strong Match — candidate is very well qualified
- 60-79: Good Match — qualified with minor gaps
- 40-59: Partial Match — has potential but significant gaps
- 0-39: Weak Match — major qualification mismatch

Be honest and precise. Do not inflate scores.
`;

  return generateJSON(prompt);
};

module.exports = { matchCandidateToJob };