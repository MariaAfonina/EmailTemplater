import "./input.css";

const Input = ({
  valueName,
  classNameLabel,
  name,
  value,
  setValue,
  classNameInput,
  placeholder,
}) => {
  function onInputChange(e) {
    setValue(valueName, e.target.value);
  }

  return (
    <div className="form-parameter">
      <label className={`form-label ${classNameLabel}`} htmlFor={valueName}>
        {name}
      </label>
      <input
        id={valueName}
        type="text"
        value={value}
        onChange={onInputChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
