import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardFirstTime from '../components/DashboardFirstTime';
import DashboardOverview from '../components/DashboardOverview';
import DashboardNewUserWelcome from '../components/DashboardNewUserWelcome';
import DashboardOldUserWelcome from '../components/DashboardOldUserWelcome';
import DashboardComplianceChecklist from '../components/DashboardComplianceChecklist';
import DashboardLicensesAndCertifications from '../components/DashboardLicensesAndCertifications';
import DashboardLegalDocuments from '../components/DashboardLegalDocuments';
import DashboardStepByStepGuide from '../components/DashboardStepByStepGuide';
import DashboardBestPractices from '../components/DashboardBestPractices';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [compliancePercentage, setCompliancePercentage] = useState(80);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/auth/get-user-data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchComplianceData = async () => {
      if (userData?.email) {
        try {
          const response = await axios.post(`${config.API_BASE_URL}/questions/calculate-compliance-percentage`, {
            headers: {
              'Content-Type': 'application/json',
            },
            email: userData.email
          });

          setCompliancePercentage(response.data.compliancePercentage);
        } catch (error) {
          console.error('Error fetching compliance data:', error);
        }
      }
    };

    if (userData?.email) {
      fetchComplianceData();
    }
  }, [userData]);

  useEffect(() => {
    const firstTimeSetupDone = localStorage.getItem('firstTimeSetupDone');
    if (firstTimeSetupDone) {
      setFirstTime(false);
    }
  }, []);

  const handleStartClick = () => {
    localStorage.setItem('firstTimeSetupDone', 'true');
    setFirstTime(false);
    navigate(`/questionnaire/${userData.email}`);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleChatbotTabClick = () => {
    navigate('/chatbot');
  };

  return (
    <div className="dashboard">
      <Sidebar email={userData?.email} />
      <main className="main-content">
        <Header setIsAuthenticated={setIsAuthenticated} />
        {firstTime ? <DashboardNewUserWelcome /> : <DashboardOldUserWelcome />}

        <div className="tabs">
          <span
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            OVERVIEW
          </span>
          <span
            className={`tab ${activeTab === 'complianceChecklist' ? 'active' : ''}`}
            onClick={() => handleTabClick('complianceChecklist')}
          >
            COMPLIANCE CHECKLIST
          </span>
          <span
            className={`tab ${activeTab === 'stepByStepGuide' ? 'active' : ''}`}
            onClick={() => handleTabClick('stepByStepGuide')}
          >
            STEP-BY-STEP GUIDE
          </span>
          <span
            className={`tab ${activeTab === 'licensesCertifications' ? 'active' : ''}`}
            onClick={() => handleTabClick('licensesCertifications')}
          >
            LICENSE & CERTIFICATIONS
          </span>
          <span
            className={`tab ${activeTab === 'legalDocuments' ? 'active' : ''}`}
            onClick={() => handleTabClick('legalDocuments')}
          >
            LEGAL DOCUMENTS
          </span>
          <span
            className={`tab ${activeTab === 'bestPractices' ? 'active' : ''}`}
            onClick={() => handleTabClick('bestPractices')}
          >
            BEST PRACTICES
          </span>
          {/* New Chatbot tab */}
          <span
            className={`tab ${activeTab === 'chatbot' ? 'active' : ''}`}
            onClick={handleChatbotTabClick}
          >
            CHATBOT
          </span>
        </div>

        {firstTime && <DashboardFirstTime onStart={handleStartClick} />}
        {!firstTime && activeTab === 'overview' && <DashboardOverview compliancePercentage={compliancePercentage} email={userData?.email} complianceChecklist={userData?.userStats?.complianceChecklist} />}
        {!firstTime && activeTab === 'complianceChecklist' && (
          <DashboardComplianceChecklist complianceChecklist={userData?.userStats?.complianceChecklist} email={userData?.email} />
        )}
        {!firstTime && activeTab === 'stepByStepGuide' && (
          <DashboardStepByStepGuide stepByStepGuide={userData?.userStats?.stepByStepGuide} />
        )}
        {!firstTime && activeTab === 'licensesCertifications' && (
          <DashboardLicensesAndCertifications certifications={userData?.userStats?.certifications} email={userData?.email} />
        )}
        {!firstTime && activeTab === 'legalDocuments' && (
          <DashboardLegalDocuments legalDocuments={userData?.userStats?.legalDocuments} />
        )}
        {!firstTime && activeTab === 'bestPractices' && <DashboardBestPractices bestPracticesData={userData?.userStats?.doDont} />}
      </main>
    </div>
  );
};

export default Dashboard;
