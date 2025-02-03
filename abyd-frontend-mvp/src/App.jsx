import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ReportPage from './pages/ReportPage';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/Signup';
import { useEffect, useState } from 'react';
import Chatbot from './components/Chatbot';
import DocBuilder from './components/DocBuilder';
import OnboardingQuestions from './components/OnboardingQuestions';
import Questionnaire from './components/Questionnaire';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const expirationTime = payload.exp;
        const currentTime = Date.now() / 1000;

        if (expirationTime > currentTime) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/ai-doc-builder" element={<DocBuilder />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/onboarding' element={<OnboardingQuestions />} />
        <Route path='/questionnaire/:email' element={<Questionnaire />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/settings' element={<Settings setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/start-compliance' element={<Questionnaire />} />
      </Routes>
    </>
  );
}

export default App;
