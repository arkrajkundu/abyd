import React, { useState } from 'react';
import axios from 'axios';
import './DashboardComplianceChecklist.css';
import config from '../config'

const DashboardComplianceChecklist = ({ complianceChecklist, email }) => {
  const toggleItemStatus = async (index) => {
    const updatedChecklist = [...complianceChecklist];
    updatedChecklist[index][1] = !updatedChecklist[index][1];

    try {
      const response = await axios.put(`${config.API_BASE_URL}/questions/update-compliance-checklist`, {
        email: email,
        complianceChecklist: updatedChecklist
      });

      if (response.status === 200) {
        complianceChecklist = updatedChecklist;
      }
    } catch (error) {
      console.error('Error updating compliance checklist:', error);
    }
  };

  const requiredItems = complianceChecklist.filter(item => !item[1]);
  const achievedItems = complianceChecklist.filter(item => item[1]);

  return (
    <div className='checklist'>
      <h3>Your Report-Based Compliance Checklist is Ready</h3>

      {requiredItems.length > 0 && (
        <div className="required-section">
          <h4>Required</h4>
          <ul>
            {requiredItems.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item[1]}
                  onChange={() => toggleItemStatus(complianceChecklist.indexOf(item))}
                />
                {item[0]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {achievedItems.length > 0 && (
        <div className="achieved-section">
          <h4>Achieved</h4>
          <ul>
            {achievedItems.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item[1]}
                  onChange={() => toggleItemStatus(complianceChecklist.indexOf(item))}
                />
                {item[0]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {requiredItems.length === 0 && achievedItems.length === 0 && (
        <p>No compliance checklist available.</p>
      )}
    </div>
  );
};

export default DashboardComplianceChecklist;