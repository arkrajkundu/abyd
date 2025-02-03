import React, { useState } from 'react';
import './DashboardLicensesAndCertifications.css';
import axios from 'axios';
import config from '../config';

const DashboardLicensesAndCertifications = ({ certifications, email }) => {
  const [certs, setCerts] = useState(certifications);

  const toggleCertification = (index, subIndex) => {
    const updatedCertifications = [...certs];
    updatedCertifications[index][subIndex][1] = !updatedCertifications[index][subIndex][1];

    setCerts(updatedCertifications);


    axios
      .post(`${config.API_BASE_URL}/questions/update-certifications`, {
        email,
        certifications: updatedCertifications,
      })
      .then(response => {
        console.log('Certifications updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating certifications:', error);
      });
  };

  const toggleDetails = (index, subIndex) => {
    const updatedCertifications = [...certs];
    updatedCertifications[index][subIndex] = !updatedCertifications[index][subIndex];
    setCerts(updatedCertifications);
  };

  const requiredCertifications = [];
  const alreadyHaveCertifications = [];

  certs.forEach(certGroup => {
    if (certGroup.length === 2) {
      const [title, isChecked] = certGroup[0];
      if (title && certGroup[1][0] && certGroup[1][1] !== undefined) {
        const cert = {
          title,
          details: certGroup[1][0],
          checked: isChecked,
        };
        if (isChecked) {
          alreadyHaveCertifications.push(cert);
        } else {
          requiredCertifications.push(cert);
        }
      }
    }
  });

  return (
    <div className="dashboard-lc-container">
      <div className="section">
        <h3 className="section-title required">Required</h3>
        {requiredCertifications.length > 0 ? (
          requiredCertifications.map((cert, index) => (
            <div className="certification-item" key={index}>
              <div className="certification-details" onClick={() => toggleDetails(index, 1)}>
                <span className="certification-title">{cert.title}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={cert.checked}
                  onChange={() => toggleCertification(index, 0)}
                />
                {cert.showDetails && (
                  <div className="certification-details-text">
                    {cert.details}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No required certifications.</p>
        )}
      </div>

      <div className="section">
        <h3 className="section-title already-have">Already Have</h3>
        {alreadyHaveCertifications.length > 0 ? (
          alreadyHaveCertifications.map((cert, index) => (
            <div className="certification-item" key={index}>
              <div className="certification-details" onClick={() => toggleDetails(index, 1)}>
                <span className="certification-title">{cert.title}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={cert.checked}
                  onChange={() => toggleCertification(index, 0)}
                />
                {cert.showDetails && (
                  <div className="certification-details-text">
                    {cert.details}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No certifications available under 'Already Have'.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardLicensesAndCertifications;