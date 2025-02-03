import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./OnboardingQuestions.css";
import assets from '../assets/assets';

const OnboardingQuestions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const totalSteps = 3;
  const navigate = useNavigate();

  const questions = [
    "What industry does your startup operate in?",
    "At what stage is your company currently?",
    "What type of business structure does your startup have?",
  ];

  const options = [
    ["Tech-Driven", "Drone"],
    ["Idea/Pre-Launch", "Early-Stage", "Growth/Scaling", "Established"],
    ["Sole Proprietorship", "Partnership", "Private Limited", "Public Limited"],
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep - 1] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    navigate("/dashboard");
  };

  return (
    <div className="onboarding-questions">
      <div className="progress-bar">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`progress-step ${index + 1 <= currentStep ? "active" : ""}`}
          ></div>
        ))}
      </div>
      <div className="below-progress">
        <button
          className="back-button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          &lt; Previous
        </button>
        <img src={assets.abyd} alt="abyd logo" />
      </div>

      <div className="question-container">
        <h3>Question {currentStep}/{totalSteps}</h3>
        <h2>{questions[currentStep - 1]}</h2>

        <select
          className="dropdown"
          value={answers[currentStep - 1] || ""}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {options[currentStep - 1].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className="next-button"
          onClick={currentStep === totalSteps ? handleSubmit : handleNext}
        >
          {currentStep === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingQuestions;