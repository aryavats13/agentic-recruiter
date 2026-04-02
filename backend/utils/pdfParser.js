// utils/pdfParser.js — Extract clean text from PDF buffer

const pdfParse = require('pdf-parse');

/**
 * Parses a PDF buffer and returns clean text.
 * @param {Buffer} buffer — PDF file buffer from multer memory storage
 * @returns {Promise<string>} — Extracted text content
 */
const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length < 50) {
      throw Object.assign(
        new Error('PDF appears to be empty or contains only images/scans. Please upload a text-based PDF.'),
        { type: 'VALIDATION_ERROR' }
      );
    }

    // Clean up the extracted text
    const cleaned = data.text
      .replace(/\r\n/g, '\n')           // Normalize line endings
      .replace(/\n{3,}/g, '\n\n')       // Collapse excessive blank lines
      .replace(/[^\S\n]+/g, ' ')        // Collapse multiple spaces
      .trim();

    return cleaned;
  } catch (err) {
    if (err.type === 'VALIDATION_ERROR') throw err;

    // pdf-parse throws on corrupt/encrypted files
    throw Object.assign(
      new Error('Failed to read PDF. The file may be corrupted, password-protected, or in an unsupported format.'),
      { type: 'VALIDATION_ERROR' }
    );
  }
};

module.exports = { extractTextFromPDF };