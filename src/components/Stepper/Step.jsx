const Step = ({ stepName, num, status }) => {
  return (
    <li className={`step-wrapper ${status}-step-wrapper`}>
      <span className={`numbering num-${status}-step`}>{num}</span>
      {stepName}
    </li>
  );
};

export default Step;
