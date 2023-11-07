import { styled } from "styled-components";

function TextBox({displayName, fieldName, isRequired = false, ...props}) {
    return (
        <div {...props}>
            <label htmlFor={fieldName}>
                {displayName} {isRequired ? <span>(required)</span> : null}
            </label><br />
            <Field type="text" name={fieldName} id={fieldName} required={isRequired ?? false}/>
        </div>
    );
}

function NumericalTextBox({displayName, fieldName, isRequired = false}) {
    return (
        <div>
            <label htmlFor={fieldName}>
                {displayName} {isRequired ? <span>(required)</span> : null}
            </label><br />
            <Field type="number" name={fieldName} id={fieldName} required={isRequired ?? false}/>
        </div>
    );
}

function TextArea({displayName, fieldName, isRequired = false, maxLength="1024", ...props}) {
    return (
        <div {...props}>
            <label htmlFor={fieldName}>
                {displayName} {isRequired ? <span>(required)</span> : null}
            </label><br />
            <Area type="text" name={fieldName} id={fieldName} maxLength={maxLength} required={isRequired ?? false}/>
        </div>
    );
}

const Field = styled.input`
    width: 100%;
    height: 2em;
    border: 0.1em solid #94866d;
`;

const Area = styled.textarea`
    width: 100%;
    height: 5em;
    border: 0.1em solid #94866d;
    resize: vertical;
`;

export { TextBox, NumericalTextBox, TextArea };