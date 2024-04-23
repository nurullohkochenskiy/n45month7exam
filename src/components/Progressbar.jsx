import React from 'react';

const ProgressBar = ({ currentTime, duration }) => {
  const calculateProgress = () => {
    return (currentTime / duration) * 100;
  };

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${calculateProgress()}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
