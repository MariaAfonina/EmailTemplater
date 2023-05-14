import Step from "./Step";
import "./Stepper.css";

const Stepper = ({ steps, stepsStatus }) => {
  return (
    <ul className="stepper-container">
      {steps.map((label, index) => (
        <Step
          key={index + 1}
          stepName={label}
          status={stepsStatus[index + 1]}
          num={index + 1}
        />
      ))}
    </ul>
  );
};

export default Stepper;
