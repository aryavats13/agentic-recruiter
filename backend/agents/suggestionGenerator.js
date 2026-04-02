// agents/suggestionGenerator.js
// Agent 3: Generates actionable resume optimization suggestions

const { generateJSON } = require('../utils/geminiClient');

/**
 * Generates targeted suggestions to optimize the resume for the job.
 * @param {object} candidateProfile — Output from resumeAnalyzer
 * @param {string} jobDescription — Raw job description text
 * @param {object} matchResult — Output from jobMatcher
 * @returns {Promise<object>} — Specific, actionable optimization suggestions
 */
const generateOptimizationSuggestions = async (candidateProfile, jobDescription, matchResult) => {
  // Build context about existing bullets for targeted rewriting
  const existingBullets = candidateProfile.workExperience
    .flatMap(exp =>
      exp.bullets.slice(0, 3).map(b => `[${exp.title} @ ${exp.company}]: ${b}`)
    )
    .slice(0, 10)
    .join('\n');

  const prompt = `
You are an expert resume coach specializing in ATS optimization and executive resume writing.

CANDIDATE PROFILE SUMMARY:
- Name: ${candidateProfile.name}
- Role: ${candidateProfile.currentRole}
- Experience: ${candidateProfile.totalExperienceYears} years
- Skills: ${[...candidateProfile.skills.technical, ...candidateProfile.skills.soft].join(', ')}

JOB DESCRIPTION:
"""
${jobDescription}
"""

MATCH ANALYSIS:
- Match Score: ${matchResult.matchScore}/100
- Missing Critical Skills: ${matchResult.missingSkills.critical.join(', ')}
- Missing Preferred Skills: ${matchResult.missingSkills.preferred.join(', ')}

CURRENT RESUME BULLETS:
${existingBullets}

Generate ONLY valid JSON matching this schema:

{
  "overallResumeScore": "integer 0-100 — current resume quality for this role",
  "summaryRewrite": {
    "current": "string — existing summary from resume or 'No summary found'",
    "suggested": "string — rewritten 3-sentence summary tailored to this job description",
    "reason": "string — why this rewrite helps"
  },
  "bulletImprovements": [
    {
      "original": "string — the exact original bullet",
      "improved": "string — rewritten version with stronger action verb, quantification, and keywords",
      "reason": "string — what was improved and why"
    }
  ],
  "keywordsToAdd": {
    "mustAdd": ["keywords from job description completely absent from resume — critical for ATS"],
    "shouldAdd": ["keywords that would strengthen the resume for this role"]
  },
  "sectionsToAdd": ["any missing resume sections that would help — e.g., 'Projects', 'Certifications'"],
  "formattingTips": ["array of 3-5 specific formatting/structure tips for this resume"],
  "atsOptimizationTips": ["array of 3-5 ATS-specific tips based on the job description keywords"],
  "skillsToHighlight": ["skills candidate has that should be more prominently featured"],
  "priorityActions": [
    {
      "action": "string — specific thing to do",
      "impact": "string — one of: 'High', 'Medium', 'Low'",
      "effort": "string — one of: 'Quick Fix', 'Moderate', 'Major Rewrite'"
    }
  ]
}

Rules:
- Bullet improvements must use strong action verbs (Led, Built, Increased, Reduced, etc.)
- Add quantification wherever plausible (e.g., "by X%", "for N users", "across N teams")
- Keywords must come directly from the job description
- Priority actions should be sorted by impact descending
- Generate at least 3 bullet improvements
`;

  return generateJSON(prompt);
};

module.exports = { generateOptimizationSuggestions };