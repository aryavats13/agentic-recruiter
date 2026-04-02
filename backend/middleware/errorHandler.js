// middleware/errorHandler.js — Centralized error handling

/**
 * Global error handler middleware.
 * Catches all errors thrown in routes/agents and returns a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}:`, err.message || err);

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large. Maximum size is 5MB.',
      code: 'FILE_TOO_LARGE',
    });
  }

  // Multer unexpected field error
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Unexpected file field. Use field name "resume".',
      code: 'UNEXPECTED_FILE_FIELD',
    });
  }

  // Gemini API errors
  if (err.message && err.message.includes('API_KEY')) {
    return res.status(500).json({
      error: 'AI service configuration error. Please contact support.',
      code: 'AI_CONFIG_ERROR',
    });
  }

  if (err.message && err.message.includes('quota')) {
    return res.status(429).json({
      error: 'AI service quota exceeded. Please try again later.',
      code: 'AI_QUOTA_EXCEEDED',
    });
  }

  // Validation errors
  if (err.type === 'VALIDATION_ERROR') {
    return res.status(400).json({
      error: err.message,
      code: 'VALIDATION_ERROR',
    });
  }

  // Default 500
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected error occurred.',
    code: 'INTERNAL_SERVER_ERROR',
  });
};

/**
 * Async wrapper — eliminates try/catch boilerplate in route handlers.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, asyncHandler };