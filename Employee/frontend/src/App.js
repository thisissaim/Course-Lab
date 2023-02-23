import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import React from 'react';
import Employees from "./pages/Employees";
import Update from "./pages/Update";
import './App.css'

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Employees/>} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Update/:id" element={<Update />} />

        </Routes>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
{/* <Route path="/" element={[<Searchfilter/>, <Employees/>]} /> */}