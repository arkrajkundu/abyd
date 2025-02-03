import React from 'react';
import './Industries.css';
import drone from '../assets/Drone.png';
import renew from '../assets/Renew.png';
import Gaming from '../assets/Gaming.png';
import fintech from '../assets/fintech.png';
import other from '../assets/office-48859_1280.png';
const industries = [
  { name: 'Drone', icon: drone, description: 'Revolutionizing aerial tasks and logistics.' },
  { name: 'Renewable Energy', icon: renew, description: 'Empowering sustainable solutions.' },
  { name: 'Gaming', icon: Gaming, description: 'Enhancing immersive entertainment.' },
  { name: 'FinTech', icon: fintech, description: 'Driving financial innovation and growth.' },
];

const Industries = () => {
  return (
    <section className="industries">
      <h2>Startup Industries We Serve</h2>
      <div className="industries-container">
        {industries.map((industry) => (
          <div key={industry.name} className="industry-card">
            <img src={industry.icon} alt={industry.name} className="industry-icon" />
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
          </div>
        ))}
        <div className="industry-card">
            <img src={other} className="industry-icon" />
            <h3>And Others</h3>
            {/* <p>{industry.description}</p> */}
          </div>
      </div>
    </section>
  );
};

export default Industries;
