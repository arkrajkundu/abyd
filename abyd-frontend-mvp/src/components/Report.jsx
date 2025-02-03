import React from 'react';
import './Report.css';
import assets from '../assets/assets';

const Report = ({ reportData, companyDetails }) => {
  const { company, industry, subIndustry, userId, emailId } = companyDetails || {};

  return (
    <div className="report-container">
      {reportData.guidelines.length === 0 ? (
        <div>
          <p>No data found for user: {emailId}</p>
          <button onClick={() => window.location.href = '/report'}>Go to Report Page</button>
        </div>
      ) : (
        <>
          <div className="report-header">
            <img src={assets.abyd} alt="Abyd Logo" className="header-logo" />
            <hr />
          </div>

          <h2 className='report-title'>RISK ANALYSIS SNAPSHOT</h2>

          <div className="static-report-info">
            {company && <p><strong>Company Name:</strong> {company}</p>}
            {industry && <p><strong>Industry:</strong> {industry}</p>}
            {subIndustry && <p><strong>Sub-Industry:</strong> {subIndustry}</p>}
            {userId && <p><strong>User ID:</strong> {userId}</p>}
            {emailId && <p><strong>Email:</strong> {emailId}</p>}
          </div>

          {reportData.guidelines.length > 0 && (
            <div className="report-section">
              <h3>GUIDELINES TO AVOID PENALTIES:</h3>
              <ul>
                {reportData.guidelines.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>
          )}

          {reportData.practices.length > 0 && (
            <div className="report-section">
              <h3>INDUSTRY BEST PRACTICES:</h3>
              <ul>
                {reportData.practices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </div>
          )}

          {reportData.certifications.length > 0 && (
            <div className="report-section">
              <h3>CERTIFICATIONS:</h3>
              <ul>
                {reportData.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
          )}

          {reportData.documents.length > 0 && (
            <div className="report-section">
              <h3>LEGAL DOCUMENTS:</h3>
              <ul>
                {reportData.documents.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>
            </div>
          )}

          <p><strong>For more details, contact us!</strong></p>

          <div className="report-footer">
            <hr />
            <img src={assets.abyd} alt="Datence Technologies Logo" className="footer-logo" />
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
