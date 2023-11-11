import { styled } from "styled-components";

function SubmitButton({text, ...props}) {
    return (
        <Submit type="submit" value={text} {...props}/>
    );
}

const Submit = styled.input`
    background-color: black;
    color: white;
    border: none;
    height: 3em;
    cursor: pointer;
    border-radius: 20px;
`;
export { SubmitButton };