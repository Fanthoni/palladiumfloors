import "./TextInput.css";

function TextBox({ displayName, fieldName, isRequired = false, ...props }) {
  return (
    <div {...props}>
      <label htmlFor={fieldName}>
        {displayName} {isRequired ? <span>*</span> : null}
      </label>
      <input
        className="roundCorner"
        type="text"
        name={fieldName}
        id={fieldName}
        required={isRequired ?? false}
      />
    </div>
  );
}

function NumericalTextBox({ displayName, fieldName, isRequired = false }) {
  return (
    <div>
      <label htmlFor={fieldName}>
        {displayName} {isRequired ? <span>*</span> : null}
      </label>
      <input
        className="roundCorner"
        type="number"
        name={fieldName}
        id={fieldName}
        required={isRequired ?? false}
      />
    </div>
  );
}

function TextArea({
  displayName,
  fieldName,
  isRequired = false,
  maxLength = "1024",
  ...props
}) {
  return (
    <div {...props}>
      <label htmlFor={fieldName}>
        {displayName} {isRequired ? <span>*</span> : null}
      </label>
      <textarea
        className="roundCorner"
        type="text"
        name={fieldName}
        id={fieldName}
        maxLength={maxLength}
        required={isRequired ?? false}
      />
    </div>
  );
}

export { TextBox, NumericalTextBox, TextArea };