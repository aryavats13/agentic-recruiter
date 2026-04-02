// routes/analyze.js — Orchestrator: runs all 5 agents in sequence

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { asyncHandler } = require('../middleware/errorHandler');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { analyzeResume } = require('../agents/resumeAnalyzer');
const { matchCandidateToJob } = require('../agents/jobMatcher');
const { generateOptimizationSuggestions } = require('../agents/suggestionGenerator');
const { generateInterviewQuestions } = require('../agents/interviewGenerator');
const { researchCompany } = require('../agents/companyResearcher');

router.post(
  '/',
  upload.single('resume'),
  asyncHandler(async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ error: 'Resume PDF is required.', code: 'MISSING_RESUME' });
    }

    const { jobDescription, companyName } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({
        error: 'Job description must be at least 50 characters.',
        code: 'INVALID_JOB_DESCRIPTION',
      });
    }

    if (jobDescription.length > 10000) {
      return res.status(400).json({
        error: 'Job description is too long. Please limit to 10,000 characters.',
        code: 'JOB_DESCRIPTION_TOO_LONG',
      });
    }

    const startTime = Date.now();
    console.log(`\n📋 [ANALYZE] Starting analysis for: ${req.file.originalname}`);
    if (companyName) console.log(`🏢 Company: ${companyName}`);

    console.log('🔍 Agent 1: Parsing PDF...');
    const resumeText = await extractTextFromPDF(req.file.buffer);
    console.log('🤖 Agent 1: Analyzing resume structure...');
    const candidateProfile = await analyzeResume(resumeText);

    console.log('🎯 Agent 2: Matching candidate to job...');
    const matchResult = await matchCandidateToJob(candidateProfile, jobDescription.trim());

    console.log('✏️  Agent 3: Generating optimization suggestions...');
    const suggestions = await generateOptimizationSuggestions(
      candidateProfile,
      jobDescription.trim(),
      matchResult
    );

    console.log('💬 Agent 4: Generating interview questions...');
    const interviewGuide = await generateInterviewQuestions(
      candidateProfile,
      jobDescription.trim(),
      matchResult
    );

    let companyIntel = null;
    if (companyName && companyName.trim().length > 1) {
      console.log('🏢 Agent 5: Researching company...');
      try {
        companyIntel = await researchCompany(
          companyName.trim(),
          jobDescription.trim(),
          candidateProfile,
          matchResult
        );
      } catch (err) {
        console.warn('⚠️ Company research failed (non-fatal):', err.message);
        companyIntel = null;
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ [ANALYZE] Complete in ${elapsed}s — Score: ${matchResult.matchScore}/100`);

    res.status(200).json({
      success: true,
      processingTimeSeconds: parseFloat(elapsed),
      meta: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        analyzedAt: new Date().toISOString(),
        companyName: companyName?.trim() || null,
      },
      candidateProfile,
      matchResult,
      suggestions,
      interviewGuide,
      companyIntel,
    });
  })
);

module.exports = router;