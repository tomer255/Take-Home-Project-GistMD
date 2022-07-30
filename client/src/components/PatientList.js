import React from 'react'
import styled from "styled-components";
import PatientInfo from './PatientInfo';
import data from "../data.json"

function PatientList() {
    const {Pecinats} = data;
  return (
    <Container>
        {Pecinats.map((Pecinat)=>(<PatientInfo info={Pecinat}/>))}
    </Container>
  );
}

const Container = styled.div`
width:80%;
`

export default PatientList
