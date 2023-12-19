import './App.css';
import React from 'react';
import './dashboard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Login1 from './login';
import {getStatus} from './authentication/session';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chatbot from './component/chatbot';

function App() { 
  // Corrected placement of render method
  const [Session, setSession] = useState([]);
  useEffect(() => {
     getStatus()
      .then(data => {
        console.log(data);
        // Handle the data here
        setSession(data);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [Session]);
  return(
    <div className='app'>
    {/* {
      Session.status === false ? (
        <Login1/>
      ) : 
      (
        <Dash Session={Session === null ? {name:"user"} : Session}/>
      )
    } */}
    <BrowserRouter>
  <Routes>
    <Route path="/" exact element={
      Session.status === false ? <Login1/> : 
      <Chatbot page={"chatbot"} Session={Session}/>}></Route>
    <Route path="/chatbot" exact element={<Chatbot page={"chatbot"} Session={Session}/>}></Route>
    <Route path="/portfolio" exact element={
      // Session.status === false ? <Login1/> :
      <Chatbot page={"ssevent"} Session={Session}/>}></Route>
    <Route path="/login" exact element={<Login1/>}></Route>
    <Route path="/developer" exact element={
      // Session.status === false ? <Login1/> :
      <Chatbot page={"developer"} Session={Session}/>}></Route>
  </Routes>
</BrowserRouter>
    </div>
  )
}
export default App;
