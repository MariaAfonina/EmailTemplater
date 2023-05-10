import "./ButtonBlock.css";

const ButtonBlock = ({ onClick, className, label }) => {
  return (
    <button className={`all-btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonBlock;
