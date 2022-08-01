import React from 'react'
import styled from "styled-components";

import AddPecinat from '../components/AddPatient';

function AddPatient() {

  return (
    <Container>
        <AddPecinat/>
    </Container>
  );
}

const Container = styled.div`
height: 100vh;
align-items: center;
display: flex;
flex-direction: column;
`

export default AddPatient
