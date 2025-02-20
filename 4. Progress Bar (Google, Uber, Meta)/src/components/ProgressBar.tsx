import { useEffect, useState } from "react";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedProgress(progress), 500);
  }, [progress]);

  return (
    <div className="progress-bar">
      <div
        className="progress-indicator"
        style={{
          // width: String(Number(progress) + "%")
          transform: `translateX(${animatedProgress - 100}%)`,
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
