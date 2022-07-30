import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from './pages/Home';
import {ThemeProvider} from "styled-components";

const theme = {
  primary: "#295a8b",
  secondary: "#295a8b" ,
  background:"#e6f2ff",
  secondaryBackground:"#99ccff",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{backgroundColor:theme.background}}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

