import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const PdfViewer = ({ displayedContent }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        id="content-display"
        dangerouslySetInnerHTML={{
          __html: displayedContent.join(''), // Render content as HTML
        }}
        style={{
          flex: 1,
          marginTop: '20px',
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '10px',
          overflowY: 'auto',
          fontFamily: 'Arial, Helvetica, sans-serif',
          marginLeft: "10px",
          marginRight: "10px",
        }}
      ></div>
    </div>
  );
};

export default PdfViewer;
