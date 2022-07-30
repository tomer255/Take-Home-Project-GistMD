import React, {useState} from 'react'
import styled from "styled-components";
import data from "../data.json"

const getElement = (field,key)=>{
  switch(field.type) {
    case "TextBox": return <TextBox name={key}/>
    case "Number": return <Number name={key}/>
    case "Select": return <Select name={key}>{field.options.map((option)=>(<option value={option}>{option}</option>))}</Select>
    default: return 
  }
}

function AddPatient() {
  let {Fields} = data;
  const fields = Object.entries(Fields).map(([key, field])=>({...field,element:getElement(field,key),key}))

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = Object.keys(Fields).reduce((prev, val) => ({...prev,[val] : event.target[val].value}), {});
    console.log(res);
  }

  return (
    <Container>
      <From onSubmit={handleSubmit}>
        <Header>Add Patient</Header>
        <div>
        {fields.map((field)=>(
          <Field key={field.key} >
            {field.text} {field.element}
          </Field>
          ))}
        </div>
        <Button type="submit" value="Submit" />
      </From>
    </Container>
  );
}

const GlobalStyled = `
border-radius: 5px;
padding: 0.25em 1em;
margin: 5px;
`

const Header = styled.h1`
color: transparent;
font-family: cursive;
text-transform: se;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: ${props => props.theme.primary};
`

const Container = styled.div`
width:80%;
align-items: center;
display: flex;
flex-direction: column;
`

const From = styled.form`
background-color: ${props => props.theme.secondaryBackground};
border: 2px solid ${props => props.theme.primary};
border-radius: 25px;
padding: 25px;
align-items: center;
display: flex;
flex-direction: column;
`

const Field = styled.div`
align-items: center;
display: flex;
margin: 7px;
color: ${props => props.theme.primary};
`


const TextBox = styled.input.attrs({ 
  type: 'text',
})`
${GlobalStyled}
border: 1px solid ${props => props.theme.primary};
color: ${props => props.theme.primary};
background-color:${props => props.theme.background};
`

const Number = styled.input.attrs({ 
  type: 'number',
})`
${GlobalStyled}
border: 1px solid ${props => props.theme.primary};
color: ${props => props.theme.primary};
background-color:${props => props.theme.background};
`

const Select = styled.select`
${GlobalStyled}
border: 1px solid ${props => props.theme.primary};
color: ${props => props.theme.primary};
background-color:${props => props.theme.background};
`

const Button = styled.input`
${GlobalStyled}
display: inline-block;
color: ${props => props.theme.primary};
font-size: 1em;
margin: 1em;
border: 1px solid ${props => props.theme.primary};
display: block;
background-color:${props => props.theme.background};
`;

export default AddPatient
