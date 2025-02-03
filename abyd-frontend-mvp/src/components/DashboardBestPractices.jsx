import React, { useState } from 'react';
import './DashboardBestPractices.css';

const DashboardBestPractices = ({ bestPracticesData }) => {
  const [openSections, setOpenSections] = useState({});

  // Toggle function for sections
  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="best-practices-container">
      <h1 className="best-practices-title">
        Based on your answers here are the Do's and Don'ts for obtaining Affirmative Consent Under DPDPA:
      </h1>

      {bestPracticesData.map((arr, index) => {
        // Skip empty sections (if the array is empty or contains only empty strings)
        if (!arr[0] || arr[0].trim() === '') return null;

        return (
          <div key={index} className="section">
            {/* Dropdown section header with toggle */}
            <div className="dropdown-header" onClick={() => toggleSection(index)}>
              <h2 className="section-title">{arr[0]}</h2>
            </div>

            {/* Dropdown content */}
            {openSections[index] && (
              <div className="section-content">
                <div className="section-section">
                  <h3 className="section-title-do">Do's</h3>
                  <ul className="best-practices-list">
                    {arr[1]
                      .split('\n')
                      .filter((line) => line.trim() !== '')
                      .map((line, i) => (
                        <li key={i}>
                          {line}
                          {/* You can customize these rules if needed */}
                          <span className="bp-rule"> [Rule Placeholder]</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="section-section">
                  <h3 className="section-title-dont">Don'ts</h3>
                  <ul className="best-practices-list">
                    {arr[2]
                      .split('\n')
                      .filter((line) => line.trim() !== '')
                      .map((line, i) => (
                        <li key={i}>
                          {line}
                          {/* You can customize these rules if needed */}
                          <span className="bp-rule"> [Section Placeholder]</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardBestPractices;


// import React from 'react';
// import './DashboardBestPractices.css';

// const DashboardBestPractices = () => {
//   return (
//     <div className="best-practices-container">
//       <h1 className="best-practices-title">
//         Based on your answers here are the Do's and Don'ts for obtaining Affirmative Consent Under DPDPA:
//       </h1>

//       <div className="section">
//         <h2 className="section-title-do">Do's</h2>
//         <div className="section-content">
//           <ul className="best-practices-list">
//             <li>
//               Provide a clear and separate notice detailing the types of personal data collected, the purpose of processing, data retention periods, user rights, and communication channels for inquiries or complaints.
//               <span className="bp-rule"> [Rule 3, Section 5(1)]</span>
//             </li>
//             <li>
//               Use plain language in the notice and consent request, ensuring it's easily understandable without referring to other documents.
//               <span className="bp-rule"> [Rule 3(1)(a), (b)]</span>
//             </li>
//             <li>
//               Offer granular consent options, allowing users to consent to different processing purposes and data categories separately.
//               <span className="bp-rule"> [Section 6(1), Illustration]</span>
//             </li>
//             <li>
//               Use affirmative action mechanisms like checkboxes, toggles, or “I Consent” buttons that require explicit user action to indicate consent.
//               <span className="bp-rule"> [Section 6(1)]</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="section">
//         <h2 className="section-title-dont">Don'ts</h2>
//         <div className="section-content">
//           <ul className="best-practices-list">
//             <li>
//               Don't bundle the notice with other information or terms of service. It must be presented independently.
//               <span className="bp-rule"> [Rule 3(1)(a)]</span>
//             </li>
//             <li>
//               Don't use pre-ticked boxes or opt-out mechanisms for obtaining consent. Users must actively choose to give consent.
//               <span className="bp-rule"> [Section 6(1)]</span>
//             </li>
//             <li>
//               Don't bundle unrelated purposes together when requesting consent.
//               <span className="bp-rule"> [Section 6(1)]</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardBestPractices;
