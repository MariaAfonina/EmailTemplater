import Header from "./components/header/Header";
import EmailForm from "./components/emailForm/EmailForm";
import FormSetValues from "./components/formSetValues/FormSetValues";
import Stepper from "./components/stepper/Stepper";
import { useState, createContext, useMemo } from "react";

export const EmailContext = createContext();

const steps = ["Compose Email Template", "Set Values", "Preview & Send"];

const App = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepsStatus, setStepsStatus] = useState({
    1: "active",
    2: "inactive",
    3: "inactive",
  });
  const [isComposeEmailForm, setIsComposeEmailForm] = useState(true);
  const [isFormSetValues, setIsFormSetValues] = useState(false);
  const [isPreviewForm, setIsPreviewForm] = useState(false);
  const [composeEmailValue, setComposeEmailValue] = useState();

  const mapStatusToForm = useMemo(
    () => ({
      1: isComposeEmailForm,
      2: isFormSetValues,
      3: isPreviewForm,
    }),
    [isComposeEmailForm, isFormSetValues, isPreviewForm]
  );

  const mapSetterToForm = useMemo(
    () => ({
      1: setIsComposeEmailForm,
      2: setIsFormSetValues,
      3: setIsPreviewForm,
    }),
    []
  );

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newActiveStep = isLastStep() ? 1 : activeStep + 1;
    handleComplete(newActiveStep);
  };

  const handleBack = (e) => {
    e.preventDefault();
    const newActiveStep = !isLastStep() ? 1 : activeStep - 1;
    handleComplete(newActiveStep);
  };

  const handleComplete = (newActiveStep) => {
    const newCompleted = stepsStatus;
    newCompleted[activeStep] = "inactive";
    setStepsStatus(newCompleted);
    mapSetterToForm[activeStep](!mapStatusToForm[activeStep]);
    newCompleted[newActiveStep] = "active";
    setActiveStep(newActiveStep);
    mapSetterToForm[newActiveStep](!mapStatusToForm[newActiveStep]);
  };

  return (
    <EmailContext.Provider
      value={{
        isComposeEmailForm,
        isPreviewForm,
        composeEmailValue,
        setComposeEmailValue,
        handleBack,
        handleNext,
      }}
    >
      <div>
        <Header />
        <main className="main-container">
          <Stepper steps={steps} stepsStatus={stepsStatus} />
          {isComposeEmailForm && <EmailForm />}
          {isFormSetValues && <FormSetValues />}
          {isPreviewForm && <EmailForm />}
        </main>
      </div>
    </EmailContext.Provider>
  );
};

export default App;
