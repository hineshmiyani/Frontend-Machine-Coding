import ProgressBarContainer from "./components/ProgressBarContainer";
import "./styles.css";

export default function App() {
  const bars = [10, 25, 40, 75, 90, 100];

  return (
    <div className="App">
      <div>
        <h1>Progress Bar</h1>

        <div className="progress-bar-lists">
          {bars.map((barPercentage) => (
            <ProgressBarContainer
              key={barPercentage}
              barPercentage={barPercentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
