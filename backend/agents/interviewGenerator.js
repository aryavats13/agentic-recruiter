

const { generateJSON } = require('../utils/geminiClient');

/**
 * Generates a structured interview question bank tailored to the candidate and role.
 * @param {object} candidateProfile — Output from resumeAnalyzer
 * @param {string} jobDescription — Raw job description
 * @param {object} matchResult — Output from jobMatcher
 * @returns {Promise<object>} — Categorized interview questions with guidance
 */
const generateInterviewQuestions = async (candidateProfile, jobDescription, matchResult) => {
  const prompt = `
You are an expert technical interviewer and hiring manager.

CANDIDATE: ${candidateProfile.name}
CURRENT ROLE: ${candidateProfile.currentRole}
EXPERIENCE: ${candidateProfile.totalExperienceYears} years
SKILLS: ${candidateProfile.skills.technical.join(', ')}
MATCH SCORE: ${matchResult.matchScore}/100
CONCERNS: ${matchResult.concerns.join('; ')}
STRENGTHS: ${matchResult.strengths.join('; ')}
MISSING CRITICAL SKILLS: ${matchResult.missingSkills.critical.join(', ')}

JOB DESCRIPTION:
"""
${jobDescription}
"""

Generate a structured interview guide. Return ONLY valid JSON:

{
  "interviewDuration": "string — recommended interview duration e.g. '60 minutes'",
  "interviewFormat": "string — recommended format e.g. 'Technical + Behavioral (30/30 split)'",
  "technicalQuestions": [
    {
      "question": "string — specific technical question",
      "category": "string — e.g., 'System Design', 'Coding', 'Architecture', 'Domain Knowledge'",
      "difficulty": "string — 'Easy', 'Medium', 'Hard'",
      "targetedAt": "string — what skill/gap this probes",
      "goodAnswerIndicators": ["what a strong answer would include"],
      "followUps": ["1-2 follow-up questions to go deeper"]
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string — STAR-method behavioral question",
      "targetedAt": "string — what competency this assesses",
      "redFlags": ["responses that would be concerning"],
      "greenFlags": ["responses that indicate a strong candidate"]
    }
  ],
  "gapProbeQuestions": [
    {
      "question": "string — question to probe a specific identified gap",
      "gap": "string — which gap from matchResult.missingSkills this targets",
      "purpose": "string — what you're trying to assess"
    }
  ],
  "candidateQuestions": [
    "string — questions the interviewer should expect the candidate to ask, and what they reveal"
  ],
  "scoringRubric": {
    "technicalFit": "string — what to look for",
    "culturalFit": "string — what to look for",
    "growthPotential": "string — what to look for",
    "decisionGuidance": "string — when to hire vs pass based on interview"
  }
}

Generate 5-6 technical questions, 4-5 behavioral questions, and 2-3 gap probe questions.
Make questions specific to this candidate's background and the job requirements — not generic.
`;

  return generateJSON(prompt);
};

module.exports = { generateInterviewQuestions };