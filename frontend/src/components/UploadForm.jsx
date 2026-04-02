// src/components/UploadForm.jsx
import React, { useState, useRef } from 'react';

export const UploadForm = ({ onSubmit, isLoading, progress }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!resumeFile) errs.resume = 'Please upload a PDF resume.';
    if (jobDescription.trim().length < 50)
      errs.job = 'Job description must be at least 50 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setErrors(e => ({ ...e, resume: 'Only PDF files are accepted.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(e => ({ ...e, resume: 'File must be under 5MB.' }));
      return;
    }
    setResumeFile(file);
    setErrors(e => ({ ...e, resume: null }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(resumeFile, jobDescription, companyName);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Resume Upload */}
      <div>
        <div className="section-label">Resume (PDF)</div>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? 'var(--accent-blue)' : errors.resume ? 'var(--accent-red)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '36px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? 'rgba(99,179,237,0.04)' : 'var(--bg-input)',
            transition: 'all 0.2s ease',
          }}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])} />
          {resumeFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 32 }}>📄</div>
              <div style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{resumeFile.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{(resumeFile.size / 1024).toFixed(0)} KB · Click to change</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 36 }}>☁️</div>
              <div style={{ fontWeight: 600 }}>Drop PDF here or <span style={{ color: 'var(--accent-blue)' }}>browse</span></div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Max 5MB · PDF only</div>
            </div>
          )}
        </div>
        {errors.resume && <div style={{ color: 'var(--accent-red)', fontSize: 13, marginTop: 6 }}>⚠ {errors.resume}</div>}
      </div>

      {/* Company Name */}
      <div>
        <div className="section-label">Company Name <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional — enables Company Intel tab)</span></div>
        <input
          className="input-base"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Google, Infosys, Zomato, TCS..."
          style={{ padding: '12px 16px' }}
        />
        {companyName && (
          <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 6 }}>
            ✓ Company Intel tab will be enabled — culture, interview style, salary & more
          </div>
        )}
      </div>

      {/* Job Description */}
      <div>
        <div className="section-label">Job Description</div>
        <textarea
          className="input-base"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            if (e.target.value.length >= 50) setErrors(er => ({ ...er, job: null }));
          }}
          placeholder="Paste the full job description here..."
          rows={9}
          style={{ padding: '14px 16px', resize: 'vertical', lineHeight: 1.6 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {errors.job ? <span style={{ color: 'var(--accent-red)', fontSize: 13 }}>⚠ {errors.job}</span> : <span />}
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{jobDescription.length.toLocaleString()} chars</span>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={isLoading}
        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16 }}>
        {isLoading ? (
          <><Spinner /> Analyzing... {progress > 0 && progress < 100 ? `${progress}%` : ''}</>
        ) : (
          <>⚡ Analyze Resume{companyName ? ' + Research Company' : ''}</>
        )}
      </button>

      {/* Progress */}
      {isLoading && (
        <div style={{ marginTop: -12 }}>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'var(--gradient-accent)', borderRadius: 2,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
            {progress < 20 ? '🔍 Parsing resume...' :
             progress < 40 ? '🎯 Matching to job description...' :
             progress < 60 ? '✏️ Generating suggestions...' :
             progress < 80 ? '💬 Preparing interview questions...' :
             '🏢 Researching company...'}
          </div>
        </div>
      )}
    </form>
  );
};

const Spinner = () => (
  <div style={{
    width: 16, height: 16,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  }} />
);