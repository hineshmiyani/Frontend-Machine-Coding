import { useState } from "react";
import ProgressBar from "./ProgressBar";

const ProgressBarContainer = ({ barPercentage }: { barPercentage: number }) => {
  const [progressPercentage, setProgressPercentage] = useState(barPercentage);

  return (
    <div className="progress-bar-container">
      <ProgressBar progress={progressPercentage} />
      <input
        className="progress-percentage"
        type="number"
        min={0}
        maxLength={3}
        max={100}
        value={progressPercentage}
        onChange={(event) => {
          if (
            Number(event.target?.value) >= 0 &&
            Number(event.target?.value) <= 100
          ) {
            setProgressPercentage(Number(event.target?.value));
          }
        }}
      />
    </div>
  );
};

export default ProgressBarContainer;
