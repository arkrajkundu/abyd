// DashboardPenaltyKeywords.jsx
import React from 'react';

const DashboardPenaltyKeywords = ({ penaltyKeywords }) => {
  return (
    <div>
      <h3>Penalty Keywords</h3>
      {penaltyKeywords && penaltyKeywords.length > 0 ? (
        <ul>
          {penaltyKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      ) : (
        <p>No penalty keywords available.</p>
      )}
    </div>
  );
};

export default DashboardPenaltyKeywords;
