import ButtonBlock from "./ButtonBlock";
import { useContext } from "react";
import { EmailContext } from "../../App";

const DobleButton = ({ inputValue }) => {
  const useEmailContext = useContext(EmailContext);
  return (
    <div className="btn-wrapper">
      <ButtonBlock
        label="BACK"
        className="secondary-btn"
        onClick={(e) => {
          useEmailContext.handleBack(e);
          useEmailContext.setComposeEmailValue(inputValue);
        }}
      />
      <ButtonBlock label="SEND" className="primary-btn" />
    </div>
  );
};

export default DobleButton;
