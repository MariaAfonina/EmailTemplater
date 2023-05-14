import { useContext } from "react";
import Button from "./Button";
import { EmailContext } from "../../App";
import findInputsCustomValues from "../../utils/findInputsCustomValues";
import requestOnServise from "../../utils/requestOnServise";

const DoubleButton = ({
  inputValue,
  isSetValuesForm,
  changeCompletedValues,
  inputValuesInSetValuesForm,
  emailVariables,
  setInputValuesInSetValuesForm,
}) => {
  const useEmailContext = useContext(EmailContext);

  const sendEmailAndGetAlert = (e) => {
    e.preventDefault();
    requestOnServise(useEmailContext.previewAndSendFormValue);
    // useEmailContext.setStatusSending();
    useEmailContext.setNotification(true);
    setTimeout(() => useEmailContext.setNotification(false), 5000);
  };

  return (
    <div>
      {isSetValuesForm ? (
        <div className="btn-wrapper">
          <Button
            label="BACK"
            className="secondary-btn"
            onClick={useEmailContext.handleBack}
          />
          <Button
            label="PREVIEW"
            className="primary-btn"
            onClick={(e) => {
              useEmailContext.handleNext(e);
              findInputsCustomValues(
                useEmailContext.composeEmailValue,
                setInputValuesInSetValuesForm,
                inputValuesInSetValuesForm,
                emailVariables
              );
              changeCompletedValues();
            }}
          />
        </div>
      ) : (
        <div className="btn-wrapper">
          <Button
            label="BACK"
            className="secondary-btn"
            onClick={(e) => {
              useEmailContext.handleBack(e);
              useEmailContext.setComposeEmailValue(inputValue);
            }}
          />
          <Button
            label="SEND"
            className="primary-btn"
            onClick={sendEmailAndGetAlert}
          />
        </div>
      )}
    </div>
  );
};

export default DoubleButton;
