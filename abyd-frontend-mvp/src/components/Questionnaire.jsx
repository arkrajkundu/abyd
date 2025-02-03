import React, { useState, useEffect } from 'react';
import './Questionnaire.css';
import assets from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config'

const Questionnaire = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [questionDesc, setQuestionDesc] = useState('Loading question...');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [userStats, setUserStats] = useState({
    onTheRightSideHistory: []
  });
  const totalSteps = 25;

  const [questionData, setQuestionData] = useState(null);

  const fetchQuestion = async (questionNo) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/questions/get-questions-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionNo: questionNo.toString() }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuestionData(data);
        setQuestionDesc(data.question);
        setSelectedOptions([]);
      } else {
        console.error('Error fetching question:', data.message);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const fetchNextQuestion = async (currentQuestionNo, selectedKeywords) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/questions/get-next-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          currentQuestionNo: currentQuestionNo.toString(),
          selectedKeywords: selectedKeywords.join(','),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuestionData(data);
        setQuestionDesc(data.question);
        setUserStats(prevStats => ({
          ...prevStats,
          onTheRightSideHistory: data.onTheRightSide ? [...prevStats.onTheRightSideHistory, data.onTheRightSide] : prevStats.onTheRightSideHistory,
        }));
      } else {
        console.error('Error fetching next question:', data.message);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const handleOptionChange = (event, index) => {
    const { checked } = event.target;
    const optionIndex = index + 1; // Convert to 1-based index

    if (questionData && questionData.keywords.includes("Yes") && questionData.keywords.includes("No")) {
      setSelectedOptions([optionIndex]);
      setSelectedKeywords([optionIndex]); // Store index instead of text
    } else {
      if (checked) {
        setSelectedOptions([...selectedOptions, optionIndex]);
        setSelectedKeywords([...selectedKeywords, optionIndex]);
      } else {
        setSelectedOptions(selectedOptions.filter(option => option !== optionIndex));
        setSelectedKeywords(selectedKeywords.filter(keyword => keyword !== optionIndex));
      }
    }
  };


  const handleNext = async () => {
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
      await fetchNextQuestion(nextStep + 1, selectedKeywords);
    } else {
      console.error("No more questions");
    }
  };

  const submitData = async () => {
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep);
      await fetchNextQuestion(nextStep + 1, selectedKeywords);
      navigate('/dashboard');
    } else {
      console.error("No more questions");
    }
  };

  const renderUserStats = () => {
    return (
      <div className="live-report">
        <h2>Live Report</h2>
        <hr />
        <div className="user-stats">
          {userStats.onTheRightSideHistory.map((stat, index) => (
            <div className='user-stat' key={index}>{stat}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    if (!questionData || !questionData.keywords) {
      return <p>Loading question...</p>;
    }

    const isSingleCorrect = questionData.keywords.includes("Yes") && questionData.keywords.includes("No");

    return (
      <div className="question">
        <label className='ques-title'>{currentStep + 1}. {questionDesc}</label>
        <div>
          {questionData.keywords.map((option, index) => (
            <label key={index}>
              <input
                type={isSingleCorrect ? 'radio' : 'checkbox'}
                name={isSingleCorrect ? 'single-option' : 'multi-options'}
                value={index + 1} // Send index instead of text
                onChange={(event) => handleOptionChange(event, index)}
                checked={selectedOptions.includes(index + 1)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };


  useEffect(() => {
    fetchQuestion(currentStep + 1);
  }, [currentStep]);

  const calculateProgress = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  return (
    <div className="questionnaire-container">
      <div className="question-section">
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <div className="mid-btns">
          <img src={assets.arrow} alt="Abyd" className="arrow" onClick={() => navigate('/dashboard')} />
          <button className='sde-btn' onClick={() => navigate('/dashboard')}>Save draft & exit</button>
        </div>
        <h2>Compliance Report</h2>
        <p>Help us create your Compliance Report by answering a few questions</p>
        <div className='ques-count'>Question {currentStep + 1}/{totalSteps}</div>
        {renderQuestion()}
        <div className="save-btn-div">
          {currentStep + 1 < totalSteps ? (
            <button
              className="save-button"
              onClick={handleNext}
            >
              Save and Next
            </button>
          ) : (
            <button
              className="submit-button"
              onClick={submitData}
            >
              Submit
            </button>
          )}
        </div>
        <div className="foot">
          <img src={assets.abyd} alt="" />
          <button>Need help in answering any question? Contact <span>ABYD</span></button>
        </div>
      </div>
      <div className="report-section">
        {renderUserStats()}
      </div>
    </div>
  );
};

export default Questionnaire;
