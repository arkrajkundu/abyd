import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/4400262-removebg-preview.png';
import datence from '../assets/Datence.png';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="datence-card">
        <img src={datence} alt="Datence Logo" />
      </div>
      <section className="hero-section">
        <div className="hero-visual">
          <img src={heroImage} alt="Hero Visual" />
        </div>
        <div className="hero-content">
          <h1>From Startup to Scale-Up</h1>
          <p>
            Compliance Made Simple & Smarter—Your One-Stop Solution, Powered by Experts 
            and AI and Designed for Growth.
          </p>
          <div className="hero-buttons">
            <button className="cta-primary">Get Free Demo</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
