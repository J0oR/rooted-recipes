import styled from "styled-components"  

const BasicInput = styled.input`
    background-color: #f3f3f3;
    font-size: 16px;
    height: 40px;
    border-radius: 15px;
    outline: none;
    border: none;
    width: 300px;
    text-align: center;
    padding: 8px;
    width: 300px;
    margin: auto;
`;

function Input({onChange, value, placeholder}) {

    return (    
        <BasicInput type="text" placeholder={placeholder} value={value} onChange={onChange} />
    )
}   

export default Input;