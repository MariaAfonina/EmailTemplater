import { useState, createContext } from "react";
import Header from "./components/Header/Header";
import Stepper from "./components/Stepper/Stepper";
import EmailForm from "./components/EmailForm/EmailForm";
import FormSetValues from "./components/FormSetValues/FormSetValues";
import NotificationOfSendingStatus from "./components/NotificationOfSendingStatus/NotificationOfSendingStatus";
import "./styles/reset.css";
import "./styles/style.css";

export const EmailContext = createContext();

const STEPS = ["Compose Email Template", "Set Values", "Preview & Send"];

const MAP_STEP_INDEX_TO_COMPONENT = {
  1: <EmailForm isComposeEmailForm />,
  2: <FormSetValues isSetValuesForm />,
  3: <EmailForm />,
};

const App = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepsStatus, setStepsStatus] = useState({
    1: "active",
    2: "inactive",
    3: "inactive",
  });

  const [composeEmailValue, setComposeEmailValue] = useState();
  const [previewAndSendFormValue, setPreviewAndSendFormValue] = useState();
  const [notification, setNotification] = useState(false);
  const [statusSending, setStatusSending] = useState(true);

  const handleNext = (e) => {
    e.preventDefault();
    const newActiveStep = activeStep + 1;
    handleStepChange(newActiveStep);
  };

  const handleBack = (e) => {
    e.preventDefault();
    const newActiveStep = activeStep - 1;
    handleStepChange(newActiveStep);
  };

  const handleStepChange = (newActiveStep) => {
    setStepsStatus({
      ...stepsStatus,
      [activeStep]: "inactive",
      [newActiveStep]: "active",
    });
    setActiveStep(newActiveStep);
  };

  return (
    <EmailContext.Provider
      value={{
        composeEmailValue,
        setComposeEmailValue,
        previewAndSendFormValue,
        setPreviewAndSendFormValue,
        handleBack,
        handleNext,
        setNotification,
        setStatusSending,
      }}
    >
      <div>
        <Header />
        <main className="main-container">
          <Stepper steps={STEPS} stepsStatus={stepsStatus} />
          {MAP_STEP_INDEX_TO_COMPONENT[activeStep]}
          <NotificationOfSendingStatus
            notification={notification}
            statusSending={statusSending}
          />
        </main>
      </div>
    </EmailContext.Provider>
  );
};

export default App;
