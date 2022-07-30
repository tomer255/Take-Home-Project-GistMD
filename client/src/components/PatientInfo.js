import React from 'react'
import styled from "styled-components";
import {MdOutlineDeleteOutline} from 'react-icons/md';

const DontDisplay = ["id"]

function PatientInfo({info}) {
    const entries = Object.entries(info);
    const displayEntries = entries.filter(([key, value])=>!DontDisplay.includes(key));
  return (
    <PatientFrame>
        {displayEntries.map(([key, value])=>(
            <Field>
                <FieldName>{key}</FieldName>
                <Text>{value}</Text>
            </Field>
        ))}
        <Buttons>
            <DeleteButton onClick={()=>{console.log("Delete")}}>
                <MdOutlineDeleteOutline size={22}/>
            </DeleteButton>          
        </Buttons>
    </PatientFrame>
  );
}

const PatientFrame = styled.div`
background-color: ${props => props.theme.secondaryBackground};
border: 2px solid ${props => props.theme.primary};
border-radius: 25px;
display: flex;
justify-content: space-evenly;
margin: 5px;
`

const Buttons = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const DeleteButton = styled.button`
cursor:pointer;
height: 40%;
border-radius: 12px;
border: 2px solid ${props => props.theme.primary};
color:${props => props.theme.primary};
`


const Field = styled.div`
align-items: center;
display: flex;
flex-direction: column;
`

const FieldName = styled.p`
margin-bottom: auto;
color:${props => props.theme.secondary};
font-size: small;
`

const Text = styled.p`
color:${props => props.theme.primary};
margin-top: auto;
`

export default PatientInfo
