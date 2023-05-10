const convertPrefilledEmailValuesToVariable = (prefileEmailValues) => {
  let word = "";
  let arrayResult = [];
  for (let i = 0; i < prefileEmailValues.length; i++) {
    if (prefileEmailValues[i] === "{") {
      for (let x = i; x < prefileEmailValues.length; x++) {
        word += prefileEmailValues[x];
        if (prefileEmailValues[x] === "}") {
          arrayResult.push(word);
          word = "";
          i = x;
          break;
        }
      }
    }
  }
  return arrayResult;
};

export default convertPrefilledEmailValuesToVariable;
