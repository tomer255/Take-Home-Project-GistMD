import React from 'react'
import styled from "styled-components";
import {MdOutlineDeleteOutline,MdEdit} from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../ApiEndPonts';
import { useNavigate } from "react-router-dom";

const DontDisplay = ["id"]

function PatientInfo({info,removeById}) {
    const entries = Object.entries(info);
    const displayEntries = entries.filter(([key, value])=>!DontDisplay.includes(key));
    const navigate = useNavigate();

    const deletePatient = (e)=>{
        const {id} = info;
        console.log(id);
        axios.post(API.patient.deletePatient,{id})
        .then((results)=>{
            toast.success(results.data);
            removeById(id)
        })
        .catch((error)=>{toast.error(error.response.data)})
    }

    const editPatient = (e)=>{
        navigate("/editPatient",{state:{info}})
    }

  return (
    <PatientFrame>
        {displayEntries.map(([key, value])=>(
            <Field>
                <FieldName>{key}</FieldName>
                <Text>{value}</Text>
            </Field>
        ))}
        <Buttons>
            <Button onClick={deletePatient}>
                <MdOutlineDeleteOutline size={22}/>
            </Button>
            <Button onClick={editPatient}>
                <MdEdit size={22}/>
            </Button>
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

const Button = styled.button`
cursor:pointer;
height: 40%;
border-radius: 12px;
border: 2px solid ${props => props.theme.secondary};
color:${props => props.theme.secondary};
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
