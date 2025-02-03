import React from 'react';
import assets from '../assets/assets';

const DashboardFirstTime = ({ onStart }) => {
  return (
    <section className="first-time">
      <img src={assets.dashboard} width={500} alt="Dashboard Welcome" />
      <div className="first-time-message">
        <h3>We're thrilled to have you on board!</h3>
        <p className="message">
          This toolkit is built to simplify complex compliance tasks, empowering you to protect your business, streamline legal processes, and stay compliant. Dive in to explore the resources and tools designed just for you.
        </p>
        <p className="cta">Ready to unlock your compliance?</p>
      </div>
      <button onClick={onStart}>Start Now</button>
    </section>
  );
};

export default DashboardFirstTime;
