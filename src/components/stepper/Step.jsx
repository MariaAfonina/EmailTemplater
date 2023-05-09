const Step = ({ stepName, num, status }) => {
  return (
    <ul>
      <li className={`step-wrapper ${status}-step-wrapper`}>
        <span className={`numbering num-${status}-step`}>{num}</span>
        {stepName}
      </li>
    </ul>
  );
};

export default Step;
