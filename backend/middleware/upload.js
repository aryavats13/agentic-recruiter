// middleware/upload.js — Multer configuration for PDF uploads

const multer = require('multer');

const MAX_FILE_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

// Store in memory — no disk writes needed since we parse immediately
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    const err = new Error('Only PDF files are accepted.');
    err.type = 'VALIDATION_ERROR';
    cb(err, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;