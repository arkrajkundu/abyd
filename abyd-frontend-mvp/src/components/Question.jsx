import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import abydImage from '../assets/abyd.png';
import arrow from '../assets/weui_arrow-outlined.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function Question({ onAnswer, currentQuestion, setCurrentQuestion }) {
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [["What is the legal name of your company?"], ["Are you collecting the name of your users?", "Yes", "No"], ["What is the purpose of collecting the name of the user?"], ["Are you collecting the address of your users?", "Yes", "No"], ["What is the purpose of collecting the shipping address of the user"],
  ["Are you collecting the e-mail address of your users?", "Yes", "No"], ["What is the purpose of collecting the e-mail address of the user?"], ["Are you collecting the mobile number of your users?", "Yes", "No"], ["What is the purpose of collecting the mobile number of the user?"], ["Are you accessing the camera of your users?", "Yes", "No"], ["What is the purpose of accessing the camera of the user?"],
  ["Are you collecting the age of your users?", "Yes", "No"], ["What is the purpose of collecting the age of the user?"], ["Are collecting the gender of your users?", "Yes", "No"], ["What is the purpose of collecting the gender of the user?"],
  ["Do you carry out any profiling or automated decision making?", "Yes", "No"], ["What is the purpose of this automated decision making?"], ["Do you sell personal data of your users?", "Yes", "No"], ["Please provide the email address where users can contact you."]]
  const [userAnswer, setUserAnswer] = useState('');
  const handleNext = (selectedAnswer = '') => {
    const questionData = questions[currentQuestion];
    const answer = selectedAnswer || userAnswer; // Use the selected option or the text input

    // Pass the answer to the parent component
    onAnswer(currentQuestion + 1, answer);

    // Determine the next question index
    let nextQuestion = currentQuestion + 1;

    // Skip logic: If "No" is selected, skip specific follow-up questions
    if (answer === 'No' && [1, 3, 5, 7, 9, 11, 13, 15].includes(currentQuestion)) {
      nextQuestion = currentQuestion + 2;
    }

    // Update state
    setUserAnswer('');
    setCurrentQuestion(nextQuestion);
  };

  const navigate = useNavigate();

  const generatePdf = async () => {
    const content = document.getElementById('summary-content'); // Capture the content div
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Adjust size and position
    pdf.save('answers.pdf');
  };

  if (currentQuestion >= questions.length) {
    return <p>Thank you! All questions have been answered.</p>;
  }

  const questionData = questions[currentQuestion];
  const progressWidth = ((currentQuestion + 1) / questions.length) * 100;
  return (
    <div className="chatbox-container">
      <div className="content">
        <div id="myProgress">
          <div id="myBar" style={{ width: `${progressWidth}%` }}></div>
        </div>
        <div className="saveandnext">
          <img src={arrow} alt="Abyd" className="arrow" onClick={() => navigate('/dashboard')} />
          <u className="savetext" onClick={() => navigate('/dashboard')}>Save draft & exit</u>
        </div>
        <div className="buildHead">AI Document Builder</div>
        <div className="def">
          Help us create your Privacy Policy by answering a few questions
        </div>

        <div className="questionNum">
          Question {currentQuestion + 1}/{questions.length}
        </div>
        <p className="Quest">{questionData[0]}</p>

        {/* Render options or inputs */}
        {questionData.length > 1 ? (
          // Render buttons for options
          <div className='yes-no-btn-container'>
            {questionData.slice(1).map((option, index) => (
              <button
                key={index}
                onClick={() => handleNext(option)} // Directly pass the selected answer
                className='yes-no-btn'
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          // Render text input or email input
          <div className='chatbtn-container'>
            {currentQuestion === 18 ? (
              // Render email input for question 18
              <input
                type="email"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your email address"
                className="Ans"
              />
            ) : (
              // Render regular text input for other questions
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here"
                className="Ans"
              />
            )}
            <button
              onClick={() => handleNext()} // Pass text input value
              className="Chatbtn"
            >
              Save and Next
            </button>
          </div>
        )}
      </div>

      <div className="footer">
        <img src={abydImage} alt="Abyd" className="Abyd" />
        <button className="help">Help</button>
      </div>
    </div>
  );

}

export default Question