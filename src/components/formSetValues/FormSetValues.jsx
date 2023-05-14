import { useContext, useState } from "react";
import { EmailContext } from "../../App";
import DoubleButton from "../Buttons/DoubleButton";
import Input from "../FormElements/Input";
import convertPrefilledEmailValuesToVariable from "../../utils/convertPrefilledEmailValuesToVariable";
import "./FormSetValues.css";

const FormSetValues = ({ isSetValuesForm }) => {
  const useEmailContext = useContext(EmailContext);

  const prefilledEmailValues = Object.values(
    useEmailContext.composeEmailValue
  ).join("#");

  const emailVariables =
    convertPrefilledEmailValuesToVariable(prefilledEmailValues);

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

  function changeCompletedValues() {
    let updateValues = prefilledEmailValues.replace(
      emailVariables[0],
      inputValuesInSetValuesForm[emailVariables[0]]
    );
    for (let i = 0; i < emailVariables.length; i++) {
      updateValues = updateValues.replace(
        emailVariables[i],
        inputValuesInSetValuesForm[emailVariables[i]]
      );
    }
    const resultValuesArray = updateValues.split("#");
    const setterPreviewAndSendFormValue =
      useEmailContext.setPreviewAndSendFormValue;
    setterPreviewAndSendFormValue({
      recipient: resultValuesArray[0],
      subject: resultValuesArray[1],
      emailBody: resultValuesArray[2],
    });
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
        <DoubleButton
          isSetValuesForm={isSetValuesForm}
          changeCompletedValues={changeCompletedValues}
          inputValuesInSetValuesForm={inputValuesInSetValuesForm}
          emailVariables={emailVariables}
          setInputValuesInSetValuesForm={setInputValuesInSetValuesForm}
        />
      </form>
    </div>
  );
};

export default FormSetValues;
