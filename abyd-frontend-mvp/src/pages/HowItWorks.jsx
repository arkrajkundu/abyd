import React from 'react';
import './HowItWorks.css';
import arrow from '../assets/up-arrow-png.png';
import step1 from '../assets/2068170-removebg-preview.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import step4 from '../assets/step4.png';
import step5 from '../assets/step5.png';
const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      img: step1,
      title: 'Tailored Compliance Determination',
      description: [
        'Answer a simple, industry-specific questionnaire.',
        'Instantly discover all the compliance requirements your business needs to meet.',
      ],
    },
    {
      id: 2,
      img: step2,
      title: 'Smart Matchmaking',
      description: [
        'Based on your requirements, we connect you with professionals who specialize in your specific compliance needs.',
        'You’ll always get the right expert for the job.',
      ],
    },
    {
      id: 3,
      img: step3,
      title: 'Real-Time Compliance Tracking',
      description: [
        'Stay on top of all your compliance tasks with our centralized tracking feature.',
        'Monitor progress, deadlines, and status updates from one dashboard.',
      ],
    },
    {
      id: 4,
      img: step4,
      title: 'Seamless Connections',
      description: [
        'Our platform facilitates direct interactions between clients and service providers.',
        'Communicate, collaborate, and manage your projects without leaving the platform.',
      ],
    },
    {
      id: 5,
      img: step5,
      title: 'Intelligent Document Builder',
      description: [
        'Generate professional documents effortlessly with our customizable templates.',
        'Choose from a wide range of clauses and options to tailor documents to your unique needs.',
      ],
    },
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="step">
              <img src={step.img} alt={`Step ${step.id}`} className="step-image" />
              <div className="step-number">{step.id}</div>
              <div className="step-details">
                <h3>{step.title}</h3>
                {/* <ul>
                  {step.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul> */}
              </div>
            </div>
            {index < steps.length - 1 && (
              <img src={arrow} alt="Arrow" className="step-arrow" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
