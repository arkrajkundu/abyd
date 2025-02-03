import React from 'react';

const DashboardLegalDocuments = ({ legalDocuments }) => {
  // Create a Set from the array to remove duplicates, then convert it back to an array
  const uniqueDocuments = [...new Set(legalDocuments)];

  return (
    <div>
      <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Legal Documents</h3>
      {uniqueDocuments && uniqueDocuments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {uniqueDocuments.map((document, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <p>{document}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No legal documents available.</p>
      )}
    </div>
  );
};

export default DashboardLegalDocuments;
