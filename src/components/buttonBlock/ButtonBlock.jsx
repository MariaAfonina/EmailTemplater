import "./buttonBlock.css";

const ButtonBlock = ({ onClick, btnClassName, btnName }) => {
  return (
    <div>
      <button className={`all-btn ${btnClassName}`} onClick={onClick}>
        {btnName}
      </button>
    </div>
  );
};

export default ButtonBlock;
