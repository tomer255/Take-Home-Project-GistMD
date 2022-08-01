import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import styled ,{ThemeProvider} from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';


import Home from './pages/Home';
import AddPatient from './pages/AddPatient';

const whiteTheme = {
  primary: "#295a8b",
  secondary: "#295a8b" ,
  background:"#e6f2ff",
  secondaryBackground:"#99ccff",
};

const darkTheme = {
  primary: "#D6DBDF",
  secondary: "#5D6D7E" ,
  // primary: "#D6DBDF ",
  // secondary: "#5D6D7E" ,
  background:"#1B2631 ",
  secondaryBackground:"#283747",
};


function App() {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : whiteTheme}>
      <BrowserRouter>
        <AppContainer>
        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={20} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/AddPatient" element={<AddPatient />} />
            <Route exact path="/editPatient" element={<AddPatient />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
      <ToastContainer/>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
background-color : ${props => props.theme.background};
`
export default App;

