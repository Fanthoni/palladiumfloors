import { styled } from "styled-components";

function SingleSelect({displayName, fieldName, isRequired = false, options, ...props}) {
    return (
        <div {...props}>
            <label htmlFor={fieldName}>
                {displayName} {isRequired ? <span>(required)</span> : null}
            </label><br />
            <Select name={fieldName} id={fieldName}>
                {options.map((o) => {
                    return (
                        <option key={o} value={o}>{o}</option>
                    );
                })}
            </Select>
        </div>
    );
}

const Select = styled.select`
    width: 100%;
    height: 2em;
    border: 0.1em solid #94866d;
`;

export { SingleSelect };