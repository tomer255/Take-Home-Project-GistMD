import React from 'react'
import styled from "styled-components";
import PatientList from '../components/PatientList';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={()=>{navigate("/AddPatient");}}>Add Patient</Button>
        <PatientList/>
    </Container>
  );
}

const Container = styled.div`
height: 100vh;
align-items: center;
display: flex;
flex-direction: column;
`

const Button = styled.button`
border-radius: 5px;
padding: 0.25em 1em;
margin: 5px;
display: inline-block;
color: ${props => props.theme.primary};
font-size: 1em;
margin: 1em;
border: 1px solid ${props => props.theme.primary};
display: block;
background-color:${props => props.theme.background};
`;

export default Home
