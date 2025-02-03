import React from 'react';
import './Sidebar.css';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ email }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/dashboard');
  }

  const handleStartCompliance = () => {
    navigate(`/questionnaire/${email}`);
  }

  const handleDocumentBuilder = () => {
    navigate('/ai-doc-builder');
  }

  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy');
  }

  const handleContactUs = () => {
    navigate('/contact-us');
  }

  const handleSettings = () => {
    navigate('/settings');
  }

  return (
    <aside className="sidebar">
      <img src={assets.abyd} alt="" className="logo" />
      <menu>
        <nav>
          <ul>
            <li onClick={handleHome} className="active"><img src={assets.home} alt="" />Home</li>
            <li onClick={handleStartCompliance}><img src={assets.compliance} alt="" />Start Compliance</li>
            <li onClick={handleDocumentBuilder}><img src={assets.docBuilder} alt="" />Document Builder</li>
            {/* <li><img src={assets.resources} alt="" />Resources</li> */}
          </ul>
        </nav>
        <div className="bottom-menu">
          <div className="theme-toggle" onClick={handlePrivacyPolicy}><img src={assets.lightMode} alt="" />Privacy Policy</div>
          <div className="theme-toggle" onClick={handleContactUs}><img src={assets.lightMode} alt="" />Contact Us</div>
          <div className="settings" onClick={handleSettings}><img src={assets.settings} alt="" />Settings</div>
        </div>
      </menu>
    </aside>
  );
};

export default Sidebar;
