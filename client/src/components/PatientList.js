import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import PatientInfo from './PatientInfo';
import axios from "axios"
import API from "../ApiEndPonts"
import { toast } from 'react-toastify';

function PatientList() {
  const [pecinats, setPecinats] = useState([]);

  const getPatientData = ()=>{
    axios.get(API.patient.getPatients).then((results)=>{
      setPecinats(results.data);
    }).catch((error)=>{toast.error(error.response.data)})
  }

  const removeById = (id)=>{
    setPecinats(pecinats.filter(pecinat=>pecinat.id !== id))
  }

  useEffect(() => {
    getPatientData()
  },[]);
  return (
    <Container>
        {pecinats.map(Pecinat=><PatientInfo info={Pecinat} removeById={removeById}/>)}
    </Container>
  );
}

const Container = styled.div`
width:80%;
`

export default PatientList
