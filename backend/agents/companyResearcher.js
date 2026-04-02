// agents/companyResearcher.js
// Agent 5: Researches company and generates candidate-focused intel

const { generateJSON } = require('../utils/geminiClient');

const researchCompany = async (companyName, jobDescription, candidateProfile, matchResult) => {
  const prompt = `
You are a career coach and company research expert helping a job candidate prepare for their application and interview.

CANDIDATE: ${candidateProfile.name}
APPLYING FOR: ${jobDescription.substring(0, 500)}
COMPANY NAME: ${companyName}
MATCH SCORE: ${matchResult.matchScore}/100
CANDIDATE SKILLS: ${candidateProfile.skills.technical.slice(0, 10).join(', ')}

Based on your knowledge of ${companyName}, generate a comprehensive company intel report FROM THE CANDIDATE'S PERSPECTIVE to help them prepare.

Return ONLY valid JSON matching this exact schema:

{
  "companyOverview": {
    "name": "string — official company name",
    "industry": "string — industry/sector",
    "founded": "string — founding year or 'Not available'",
    "size": "string — approximate employee count or size category (Startup/Mid-size/Large/Enterprise)",
    "headquarters": "string — city, country",
    "whatTheyDo": "string — 3-4 sentence plain English explanation of what the company does and their main products/services",
    "mission": "string — company mission or vision statement if known",
    "notableAchievements": ["array of 3-5 notable facts, achievements, or things they are known for"]
  },
  "cultureAndEnvironment": {
    "workStyle": "string — Remote/Hybrid/In-office and what the work environment is like",
    "teamCulture": "string — description of team dynamics and culture",
    "values": ["array of 3-5 core company values they are known for"],
    "employeeReview": "string — general sentiment from employees — what people love and dislike",
    "growthOpportunities": "string — what career growth looks like at this company",
    "workLifeBalance": "string — honest assessment of work-life balance"
  },
  "interviewProcess": {
    "typicalStages": ["array of interview stages in order e.g. 'HR Screen', 'Technical Round', 'System Design', 'Final Interview'"],
    "knownForAsking": ["array of topics or question types this company is known for asking"],
    "interviewStyle": "string — what the interview style is like (e.g., conversational, highly technical, case-based)",
    "difficulty": "string — Easy/Medium/Hard/Very Hard",
    "duration": "string — how long the overall process typically takes",
    "tips": ["array of 4-6 specific tips for interviewing at THIS company specifically"]
  },
  "candidateAdvice": {
    "whyYouFit": "string — based on the candidate's profile, why they are a good match for this company's culture specifically",
    "angleToEmphasize": "string — what aspect of their background to highlight for THIS company",
    "researchTopics": ["array of 4-6 things the candidate should research before the interview — company-specific"],
    "questionsToAsk": ["array of 4-5 smart questions the candidate should ask the interviewer about the company"],
    "redFlags": ["array of 2-3 potential concerns about the company the candidate should be aware of"],
    "greenFlags": ["array of 3-4 positive signals that make this a good opportunity"]
  },
  "salaryAndCompensation": {
    "estimatedRange": "string — estimated salary range for this role at this company in INR or USD",
    "benefitsKnownFor": ["array of notable benefits this company offers"],
    "negotiationTip": "string — specific tip for salary negotiation with this company"
  },
  "competitorsAndMarket": {
    "mainCompetitors": ["array of 3-4 main competitors"],
    "marketPosition": "string — where this company stands in the market",
    "recentNews": "string — any notable recent developments, funding, or news about the company if known"
  }
}

If you don't have specific information about a company, make reasonable inferences based on the industry, size, and job description. Always write from the candidate's perspective using 'you' and 'your' language.
`;

  return generateJSON(prompt);
};

module.exports = { researchCompany };