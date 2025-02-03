import React, { useState } from 'react';
import './DashboardStepByStepGuide.css';

const DashboardStepByStepGuide = ({ stepByStepGuide }) => {
  const steps = stepByStepGuide
    .filter(group => group.length > 0)
    .map(group => ({
      stepTitle: group[0] || 'Untitled Step',
      subSteps: group.slice(1).map(([title, completed]) => ({
        title: title || 'Untitled Sub-Step',
        completed: completed || false,
      })),
    }));

  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(
    steps?.map((step) => step?.subSteps?.map(() => false))
  );
  const [expandedSteps, setExpandedSteps] = useState(
    steps.map(() => false)
  );

  const handleCheckboxChange = (stepIndex, subStepIndex) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex][subStepIndex] = !newCompletedSteps[stepIndex][subStepIndex];
    setCompletedSteps(newCompletedSteps);

    const totalSubSteps = steps.reduce((acc, step) => acc + step.subSteps.length, 0);
    const completedSubSteps = newCompletedSteps.flat().filter((completed) => completed).length;

    const newProgress = (completedSubSteps / totalSubSteps) * 100;
    setProgress(newProgress);
  };

  const renderBulletPoints = (text) => {
    return text.split('\n').map((line, index) => (
      <li key={index}>{line}</li>
    ));
  };

  const toggleStepVisibility = (index) => {
    setExpandedSteps(prev => {
      const newExpandedSteps = [...prev];
      newExpandedSteps[index] = !newExpandedSteps[index];
      return newExpandedSteps;
    });
  };

  return (
    <div className="dashboard-container">
      <h3>Step-by-Step Guide</h3>

      <div className="progress-bar">
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`dot ${completedSteps[index]?.every(Boolean) ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
        ))}
        <div className="progress-bar-line" style={{ width: `${progress}%` }}></div>
      </div>

      {steps.length > 0 ? (
        <div className="step-boxes">
          {steps?.map((step, stepIndex) => (
            <div className="step-box" key={stepIndex}>
              <div className="step-title" onClick={() => toggleStepVisibility(stepIndex)}>
                <h4>{step.stepTitle}</h4>
                <input
                  type="checkbox"
                  checked={completedSteps[stepIndex]?.every(Boolean)}
                  onChange={() =>
                    setCompletedSteps((prev) => {
                      const newSteps = [...prev];
                      newSteps[stepIndex] = newSteps[stepIndex]?.map(() => true);
                      return newSteps;
                    })
                  }
                />
              </div>
              <div
                className={`sub-steps ${expandedSteps[stepIndex] ? 'expanded' : ''}`}
                style={{ maxHeight: expandedSteps[stepIndex] ? '1000px' : '0' }}
              >
                {step?.subSteps?.map((subStep, subStepIndex) => (
                  <div className="sub-step" key={subStepIndex}>
                    <input
                      type="checkbox"
                      checked={completedSteps[stepIndex][subStepIndex]}
                      onChange={() => handleCheckboxChange(stepIndex, subStepIndex)}
                    />
                    <ul>{renderBulletPoints(subStep.title)}</ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No step-by-step guide available.</p>
      )}

      {completedSteps?.flat().every(Boolean) && (
        <div className="achieved">
          <p>Achieved! All steps are completed.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardStepByStepGuide;