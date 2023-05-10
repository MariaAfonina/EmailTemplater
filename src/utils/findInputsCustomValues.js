const findInputsCustomValues = (
  useEmailContext,
  setInputValuesInSetValuesForm,
  inputValuesInSetValuesForm,
  emailVariables
) => {
  const emailKeys = Object.keys(useEmailContext);

  for (let i = 0; i < emailKeys.length; i++) {
    let valueFromKey = useEmailContext[emailKeys[i]];
    let wordKey = "";
    for (let x = 0; x < valueFromKey.length; x++) {
      if (valueFromKey[x] === "{") {
        wordKey = "";
        for (let y = x; y < valueFromKey.length; y++) {
          wordKey = wordKey + valueFromKey[y];
          if (valueFromKey[y] === "}") {
            setInputValuesInSetValuesForm({
              ...inputValuesInSetValuesForm,
              [wordKey]: emailVariables[wordKey],
            });
            wordKey = inputValuesInSetValuesForm[wordKey];
            x = y;
          }
          break;
        }
      }
    }
  }
};

export default findInputsCustomValues;
