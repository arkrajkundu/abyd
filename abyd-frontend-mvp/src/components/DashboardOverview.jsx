import React from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import './DashboardOverview.css'
import Checklist from './Checklist';

const DashboardOverview = ({ compliancePercentage, email, complianceChecklist }) => {
  const navigate = useNavigate();

  const openMail = () => {
    navigate('https://mail.google.com/mail/?view=cm&fs=1&to=datence.dev@gmail.com');
  };

  const goToContactUs = () => {
    navigate('/contact-us');
  }

  const goToAIDocBuilder = () => {
    navigate('/ai-doc-builder');
  };

  const handleStartCompliance = () => {
    navigate(`/questionnaire/${email}`);
  }

  const circleDasharray = 440; // Max circumference of the circle (2 * π * radius = 2 * π * 70px)
  const strokeDashoffset = circleDasharray - (circleDasharray * compliancePercentage) / 100;

  return (
    <section className="dashboard-overview">
      <div className="left">
        <div className="compliance-toolkit do-card">
          <h2>DIY Compliance Toolkit</h2>
          <p>Access everything you need to ensure compliance all in one place.</p>
          <ul>
            <li>Compliance Checklist</li>
            <li>Step-by-step Guide</li>
            <li>License & Certifications</li>
            <li>FAQ's</li>
          </ul>
          <div className="btndiv">
            <button onClick={handleStartCompliance}>Start DIY Compliance</button>
          </div>
        </div>
        <div className="compliance-progress do-card">
          <h2>This is your Compliance Progress</h2>
          <div className="progress-circle">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" stroke="#ddd" strokeWidth="8" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#388e3c"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circleDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <span>{compliancePercentage}%</span>
          </div>
        </div>
        <div className='legal-advisory do-card'>
          <h4>Connect for Legal Advisory to start your Compliance</h4>
          <p>Get legal advice from start to end</p>
          <div className="btndiv">
            <button onClick={goToContactUs}>Contact Us</button>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="dashboard-overview-cards">
          <div className="dashboard-overview-card do-card">
            <h4>Connect with Insurance Experts</h4>
            <p>Based on your report here are the suggestions</p>
            <img src={assets.CardImage} alt="" />
            <div className="btndiv">
              <button onClick={openMail}>Get Assistance</button>
            </div>
          </div>
          <div className="dashboard-overview-card do-card">
            <h4>Connect with Tender Experts</h4>
            <p>Based on your report here are the suggestions</p>
            <img src={assets.CardImage} alt="" />
            <div className="btndiv">
              <button onClick={openMail}>Get Assistance</button>
            </div>
          </div>
          <div className="dashboard-overview-card do-card">
            <h4>Connect with IP Experts</h4>
            <p>Based on your report here are the suggestions</p>
            <img src={assets.CardImage} alt="" />
            <div className="btndiv">
              <button onClick={openMail}>Get Assistance</button>
            </div>
          </div>
        </div>
        <div className="checklist do-card">
          <div className="checklist-header">Compliance Checklist</div>
          <Checklist complianceChecklist={complianceChecklist} />
        </div>
      </div>
    </section >
  )
}

export default DashboardOverview
