import "./Input.css";

const Input = ({ fieldName, name, value, setValue, placeholder }) => {
  function onInputChange(e) {
    setValue(fieldName, e.target.value);
  }

  return (
    <div className="form-parameter">
      <label className="form-label" htmlFor={fieldName}>
        {name}
      </label>
      <input
        id={fieldName}
        type="text"
        defaultValue={value}
        onBlur={onInputChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
