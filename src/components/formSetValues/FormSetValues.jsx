import { useContext, useState } from "react";
import { EmailContext } from "../../App";
import ButtonBlock from "../Buttons/ButtonBlock";
import Input from "../FormElements/Input";
import convertPrefilledEmailValuesToVariable from "../../utils/convertValue";
import "./FormSetValues.css";

const FormSetValues = () => {
  const useEmailContext = useContext(EmailContext);

  const prefilledEmailValues = Object.values(
    useEmailContext.composeEmailValue
  ).join("");

  const [emailVariables, setEmailVariables] = useState(
    convertPrefilledEmailValuesToVariable(prefilledEmailValues)
  );

  const [inputValuesInSetValuesForm, setInputValuesInSetValuesForm] = useState(
    emailVariables.reduce(
      (fieldName, value) => ({ ...fieldName, [value]: value }),
      {}
    )
  );

  function updateInputField(fieldName, value) {
    setInputValuesInSetValuesForm({
      ...inputValuesInSetValuesForm,
      [fieldName]: value,
    });
  }

  function updateEmailFormFields() {
    let emailFormValues = useEmailContext.composeEmailValue; //{recipient: '{hello}', subject: '{Hello2}', emailBody: '{Hello3}'}

    // const setterToEmailFormValues = useEmailContext.setComposeEmailValue; // function

    const emailKeys = Object.keys(emailFormValues); // (3) ['recipient', 'subject', 'emailBody']

    for (let i = 0; i < emailKeys.length; i++) {
      let valueFromKey = emailFormValues[emailKeys[i]]; // '{hello}' , '{Hello2}', '{Hello3} Hello'

      let result = "";
      let wordKey = "";

      for (let x = 0; x < valueFromKey.length; x++) {
        if (valueFromKey[x] === "{") {
          result = result + wordKey;
          wordKey = "";
          for (let y = x; y < valueFromKey.length; y++) {
            wordKey = wordKey + valueFromKey[y];
            if (valueFromKey[y] === "}") {
              setInputValuesInSetValuesForm({
                ...inputValuesInSetValuesForm,
                [wordKey]: emailVariables[wordKey],
              });
              wordKey = inputValuesInSetValuesForm[wordKey];
              result = result + wordKey;
              // wordKey = "";
              x = y;
            }
            break;
          }
        }
        wordKey = wordKey + valueFromKey[x];

        // console.log(wordKey);
        // console.log(result);
        // else {
        //   valueFromKey = result;
        //   result = "";
        //   emailFormValues = {
        //     ...emailFormValues,
        //     [emailKeys[i]]: result,
        //   };
        // }
      }
    }
    // setterToEmailFormValues(emailFormValues);
  }

  return (
    <div className="set-values-wrapper">
      <form>
        <h2 className="titles">Set Values</h2>
        <div className="form-inputs-wrapper">
          {emailVariables.map((value, index) => (
            <Input
              key={index}
              fieldName={value}
              setValue={updateInputField}
              name={value}
              placeholder={value}
            />
          ))}
        </div>
        <div className="btn-wrapper">
          <ButtonBlock
            label="BACK"
            className="secondary-btn"
            onClick={useEmailContext.handleBack}
          />
          <ButtonBlock
            label="PREVIEW"
            className="primary-btn"
            onClick={useEmailContext.handleNext}
          />
        </div>
      </form>
      <button onClick={updateEmailFormFields}>Paka</button> {/* testButton */}
    </div>
  );
};

export default FormSetValues;
