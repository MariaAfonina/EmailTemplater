import ButtonBlock from "../buttonBlock/ButtonBlock";
import "./emailForm.css";
import { useContext, useState } from "react";
import { EmailContext } from "../../App";
import Input from "../input/Input";
import { useMemo } from "react";

const EmailForm = () => {
  const useEmailContext = useContext(EmailContext);

  const defaultInputValue = useMemo(
    () => ({
      recipient: "",
      subject: "",
      textarea: "",
    }),
    []
  );

  const [inputValue, setInputValue] = useState(
    useEmailContext.composeEmailValue || defaultInputValue
  );

  function updateInputField(fieldName, value) {
    setInputValue({ ...inputValue, [fieldName]: value });
  }

  return (
    <div className="email-form-wrapper">
      <h2 className="titles">Compose Email Template</h2>
      <form>
        <Input
          valueName="recipient"
          classNameLabel="recipient-label"
          name="Recipients"
          value={inputValue.recipient}
          setValue={updateInputField}
          placeholder="{recipient}"
        />

        <Input
          valueName="subject"
          classNameLabel="subject-label"
          name="Subject"
          value={inputValue.subject}
          setValue={updateInputField}
          placeholder="{subject}"
        />

        <div className="form-parameter">
          <label className="form-label textarea-label" htmlFor="textarea">
            Body
          </label>
          <textarea
            id="textarea"
            type="text"
            value={inputValue.textarea}
            onChange={(e) => updateInputField("textarea", e.target.value)}
            className="textarea-block"
            placeholder="Hi {name}, 
            We'd like to invite you to a {subject} on {date} at {location}.
            Thanks,{signature}"
          />
        </div>
        {useEmailContext.isComposeEmailForm && (
          <div className="btn-set-variables-wrapper">
            <ButtonBlock
              btnName="SET VARIABLES"
              btnClassName="main-btn"
              onClick={(e) => {
                useEmailContext.handleNext(e);
                useEmailContext.setComposeEmailValue(inputValue);
              }}
            />
          </div>
        )}
        {useEmailContext.isPreviewForm && (
          <div className="btn-wrapper">
            <ButtonBlock
              btnName="BACK"
              btnClassName="secondary-btn"
              onClick={(e) => {
                useEmailContext.handleBack(e);
                useEmailContext.setComposeEmailValue(inputValue);
              }}
            />
            <ButtonBlock btnName="SEND" btnClassName="main-btn" />
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailForm;
