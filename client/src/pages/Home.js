import React from 'react'
import styled from "styled-components";
import PatientList from '../components/PatientList';
import AddPecinat from '../components/AddPatient';

function Home() {
  return (
    <Container>
        <AddPecinat/>
        <PatientList/>
    </Container>
  );
}

const Container = styled.div`
align-items: center;
display: flex;
flex-direction: column;
`

export default Home
