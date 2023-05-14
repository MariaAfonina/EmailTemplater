import { useContext, useState, useMemo } from "react";
import { EmailContext } from "../../App";
import Button from "../Buttons/Button";
import Input from "../FormElements/Input";
import DoubleButton from "../Buttons/DoubleButton";
import Textarea from "../FormElements/Textarea";
import "./EmailForm.css";

const EmailForm = ({ isComposeEmailForm }) => {
  const useEmailContext = useContext(EmailContext);

  const defaultInputValue = useMemo(
    () => ({
      recipient: "",
      subject: "",
      emailBody: "",
    }),
    []
  );

  const [inputValue, setInputValue] = useState(
    useEmailContext.composeEmailValue || defaultInputValue
  );

  function updateInputField(fieldName, value) {
    setInputValue({ ...inputValue, [fieldName]: value });
  }

  const onClick = (e) => {
    useEmailContext.handleNext(e);
    useEmailContext.setComposeEmailValue(inputValue);
  };

  const finalEmailValues =
    useEmailContext.previewAndSendFormValue || defaultInputValue;

  return (
    <div className="email-form-wrapper">
      {isComposeEmailForm ? (
        <h2 className="titles">Compose Email Template</h2>
      ) : (
        <h2 className="titles">Preview and Send</h2>
      )}

      {isComposeEmailForm ? (
        <form>
          <Input
            fieldName="recipient"
            name="Recipients"
            value={inputValue.recipient}
            setValue={updateInputField}
            placeholder="{recipient}"
          />

          <Input
            fieldName="subject"
            name="Subject"
            value={inputValue.subject}
            setValue={updateInputField}
            placeholder="{subject}"
          />

          <Textarea
            fieldName="emailBody"
            name="Body"
            value={inputValue.emailBody}
            setValue={updateInputField}
            placeholder="Hi {name}, 
          We'd like to invite you to a {subject} on {date} at {location}.
          Thanks,{signature}"
          />
          <div className="btn-set-variables-wrapper">
            <Button
              label="SET VARIABLES"
              className="primary-btn"
              onClick={onClick}
            />
          </div>
        </form>
      ) : (
        <form>
          <Input
            fieldName="recipient"
            name="Recipients"
            value={finalEmailValues.recipient}
            setValue={updateInputField}
            placeholder="{recipient}"
          />

          <Input
            fieldName="subject"
            name="Subject"
            value={finalEmailValues.subject}
            setValue={updateInputField}
            placeholder="{subject}"
          />

          <Textarea
            fieldName="emailBody"
            name="Body"
            value={finalEmailValues.emailBody}
            setValue={updateInputField}
            placeholder="Hi {name}, 
            We'd like to invite you to a {subject} on {date} at {location}.
            Thanks,{signature}"
          />
          <DoubleButton inputValue={inputValue} />
        </form>
      )}
    </div>
  );
};

export default EmailForm;
