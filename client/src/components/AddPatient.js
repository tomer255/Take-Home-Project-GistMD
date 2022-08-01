import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import axios from "axios"
import API from "../ApiEndPonts"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';

const getElement = (field,key,value)=>{
   value = value ? value : "";
    switch(field.type) {
      case "TextBox": return <TextBox name={key} defaultValue={value}/>
      case "Number": return <Number name={key} defaultValue={value}/>
      case "Select": return <Select name={key} defaultValue={value}>{field.options.map((option)=>(<option value={option}>{option}</option>))}</Select>
      default: return 
  }
}

function AddPatient() {
  const [fields,setFields] = useState([])
  const navigate = useNavigate();
  const {state} = useLocation();
  const info = state ? state.info  : {}
  const title = state ? "Edit Patient"  : "Add Patient"
  const ApiEndPont = state ? API.patient.editPatient : API.patient.addPatient

  const getFields = () =>{
    axios.get(API.fields.getFields)
    .then((results)=>{
      setFields(Object.entries(results.data).map(([key, field])=>({...field,element:getElement(field,key,info[key]),key})))
    }).catch((error)=>{toast.error(error.response.data)})
  }


  useEffect(()=>{
    getFields()
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = fields.reduce((prev, val) => ({...prev,[val.key] : event.target[val.key].value}), {})
    sendPatientData(data);
    navigate("/");
  }

  const sendPatientData = (data)=>{
    axios.post(ApiEndPont,{data,id:info.id})
    .then((results)=>{toast.success(results.data)})
    .catch((error)=>{toast.error(error.response.data)})
  }

  return (
    <Container>
      <From onSubmit={handleSubmit}>
        <Header>{title}</Header>
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
