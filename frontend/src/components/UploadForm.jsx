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
    if (jobDescription.trim().length < 50) errs.job = 'Job description must be at least 50 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') { setErrors(e => ({ ...e, resume: 'Only PDF files are accepted.' })); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors(e => ({ ...e, resume: 'File must be under 5MB.' })); return; }
    setResumeFile(file);
    setErrors(e => ({ ...e, resume: null }));
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(resumeFile, jobDescription, companyName); };

  const statusText = progress < 20 ? 'Parsing resume...' :
    progress < 40 ? 'Matching to job description...' :
    progress < 60 ? 'Generating suggestions...' :
    progress < 80 ? 'Preparing interview guide...' :
    'Researching company...';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Resume Upload */}
      <div>
        <div className="section-label">Resume — PDF only</div>
        <div
          onClick={() => !isLoading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `1px dashed ${dragOver ? 'var(--border-active)' : errors.resume ? 'var(--accent-red)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '32px 24px',
            textAlign: 'center',
            cursor: isLoading ? 'default' : 'pointer',
            background: dragOver ? 'var(--bg-subtle)' : 'var(--bg-input)',
            transition: 'all 0.15s ease',
          }}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])} />
          {resumeFile ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--accent-green)" strokeWidth="1.5">
                <path d="M10 2H4a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V7l-5-5z"/>
                <path d="M10 2v5h5"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{resumeFile.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{(resumeFile.size / 1024).toFixed(0)} KB · Click to change</div>
              </div>
            </div>
          ) : (
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ margin: '0 auto 10px' }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
                Drop file here or <span style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>browse</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Maximum 5MB</div>
            </div>
          )}
        </div>
        {errors.resume && <div style={{ color: 'var(--accent-red)', fontSize: 12, marginTop: 5 }}>{errors.resume}</div>}
      </div>

      {/* Two column: Company + small help */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div className="section-label">Company Name <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 10 }}>(optional)</span></div>
          <input
            className="input-base"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Infosys, Zomato..."
            style={{ padding: '10px 14px' }}
          />
          {companyName && (
            <div style={{ fontSize: 11, color: 'var(--accent-green)', marginTop: 5, fontWeight: 500 }}>
              Company Intel tab will be enabled
            </div>
          )}
        </div>
        <div style={{
          padding: '12px 14px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>What you get</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Match score · Skill gaps · Resume rewrites · Interview Qs{companyName ? ' · Company culture & salary' : ''}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <div className="section-label">Job Description</div>
        <textarea
          className="input-base"
          value={jobDescription}
          onChange={(e) => { setJobDescription(e.target.value); if (e.target.value.length >= 50) setErrors(er => ({ ...er, job: null })); }}
          placeholder="Paste the full job description here — include all requirements, responsibilities, and qualifications for the most accurate analysis..."
          rows={8}
          style={{ padding: '12px 14px', resize: 'vertical', lineHeight: 1.65 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          {errors.job ? <span style={{ color: 'var(--accent-red)', fontSize: 12 }}>{errors.job}</span> : <span />}
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{jobDescription.length.toLocaleString()} characters</span>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={isLoading}
        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 14, borderRadius: 'var(--radius-md)' }}>
        {isLoading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Spinner />
            {statusText}
            {progress > 0 && progress < 100 && <span style={{ opacity: 0.6, fontSize: 12 }}>{progress}%</span>}
          </span>
        ) : (
          `Run Analysis${companyName ? ' + Company Research' : ''}`
        )}
      </button>

      {/* Progress bar */}
      {isLoading && (
        <div style={{ marginTop: -8 }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </form>
  );
};

const Spinner = () => (
  <div style={{
    width: 14, height: 14,
    border: '2px solid rgba(255,255,255,0.25)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    flexShrink: 0,
  }} />
);