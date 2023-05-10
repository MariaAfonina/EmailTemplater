import { useContext, useState, useMemo } from "react";
import { EmailContext } from "../../App";
import ButtonBlock from "../Buttons/ButtonBlock";
import Input from "../FormElements/Input";
import DobleButton from "../Buttons/DobleButton";
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

  return (
    <div className="email-form-wrapper">
      <h2 className="titles">Compose Email Template</h2>

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
            <ButtonBlock
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
          <DobleButton inputValue={inputValue} />
        </form>
      )}
    </div>
  );
};

export default EmailForm;
