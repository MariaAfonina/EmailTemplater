import "./formSetValues.css";
import ButtonBlock from "../buttonBlock/ButtonBlock";
import { useContext, useState } from "react";
import { EmailContext } from "../../App";
import Input from "../input/Input";

const FormSetValues = () => {
  const useEmailContext = useContext(EmailContext);

  const valueFromPrevForm = Object.values(
    useEmailContext.composeEmailValue
  ).toString();

  function convertValueToArray() {
    let word = "";
    let arrayResult = [];
    for (let i = 0; i < valueFromPrevForm.length; i++) {
      if (valueFromPrevForm[i] === "{") {
        for (let x = i; x < valueFromPrevForm.length; x++) {
          word += valueFromPrevForm[x];
          if (valueFromPrevForm[x] === "}") {
            arrayResult.push(word);
            word = "";
            break;
          }
        }
      }
    }
    return arrayResult;
  }

  const [valuesForInputs, setValuesForInputs] = useState(convertValueToArray());

  return (
    <div className="set-values-wrapper">
      <form>
        <h2 className="titles">Set Values</h2>
        <div className="form-inputs-wrapper">
          {valuesForInputs.map((value, index) => (
            <Input
              key={index}
              valueName={value}
              classNameLabel="label-set-values-form"
              name={value}
              placeholder={value}
            />
          ))}
        </div>
        <div className="btn-wrapper">
          <ButtonBlock
            btnName="BACK"
            btnClassName="secondary-btn"
            onClick={(e) => {
              useEmailContext.handleBack(e);
            }}
          />
          <ButtonBlock
            btnName="PREVIEW"
            btnClassName="main-btn"
            onClick={(e) => {
              useEmailContext.handleNext(e);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default FormSetValues;
