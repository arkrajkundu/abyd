import React from 'react'
import './ReportPage.css'
import assets from '../assets/assets'

const ReportPage = () => {
  return (
    <div className='report-page'>
      <div className="questions">
        <div className="header">
          <p>&lt;</p>
          <p>Save draft & exit</p>
        </div>
        <div className="details">
          <h2>Compliance Report</h2>
          <p>Help us create your Compliance Report by answering a few questions</p>
        </div>
        <div className="question">
          <p className="question-no">Question 1/5</p>
          <p className="question-text">1. Are you a registered entity?</p>
          <div className="options">
            <p>Yes</p>
            <p>No</p>
          </div>
          <button>Save and Next</button>
        </div>
        <div className="footer">
          <img src={assets.abyd} alt="logo" />
          <button>Need help in answering any question? Contact ABYD</button>
        </div>
      </div>
      <div className="live-report"></div>
    </div>
  )
}

export default ReportPage
