import "./TextInput.css";

function TextBox({
  displayName,
  fieldName,
  type = "text",
  isRequired = false,
  ...props
}) {
  return (
    <div {...props}>
      <label htmlFor={fieldName}>
        {displayName} {isRequired ? <span>*</span> : null}
      </label>
      <input
        className="roundCorner"
        type={type}
        name={fieldName}
        id={fieldName}
        required={isRequired ?? false}
      />
    </div>
  );
}

function EmailTextBox({
  displayName,
  fieldName,
  isRequired = false,
  ...props
}) {
  return (
    <TextBox
      displayName={displayName}
      fieldName={fieldName}
      type="email"
      isRequired={isRequired}
      {...props}
    />
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
  minLength = "50",
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
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired ?? false}
      />
    </div>
  );
}

export { TextBox, NumericalTextBox, TextArea, EmailTextBox };