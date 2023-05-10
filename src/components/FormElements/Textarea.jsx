const Textarea = ({ fieldName, name, value, setValue, placeholder }) => {
  function onInputChange(e) {
    setValue(fieldName, e.target.value);
  }
  return (
    <div className="form-parameter">
      <label className="form-label" htmlFor={fieldName}>
        {name}
      </label>
      <textarea
        id={fieldName}
        type="text"
        defaultValue={value}
        onBlur={onInputChange}
        className="textarea-block"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
