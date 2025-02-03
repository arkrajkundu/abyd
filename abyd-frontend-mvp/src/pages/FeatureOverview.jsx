// FeaturesOverview.jsx
import React from 'react';
import './FeaturesOverview.css';
import cost from '../assets/Cost.png';
import time from '../assets/SaveTime.png';
import scale from '../assets/Scale.png';
const features = [
  { title: 'Save Time, Scale Faster', icon: time },
  { title: 'Cost-Effective, Founder-Friendly', icon: scale },
  { title: 'Your All-in-One Startup Hub', icon: cost },
];

const FeaturesOverview = () => {
  return (
    <section className="features-overview">
      <h2>Key Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.icon} alt={feature.title} />
            <h3>{feature.title}</h3>
            {/* <p>{feature.description}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesOverview;
