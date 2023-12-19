// import React, {  useState } from "react";
// import Nav from "./navbar";
// import Chatbar from "./botcompo/chatmain";
// import {AiOutlineAlignLeft} from 'react-icons/ai';
// import { Logout, LogoutRounded, LogoutTwoTone } from "@mui/icons-material";
// import { useEffect } from "react";
// import { getStatus, logOut } from "../authentication/session";
// import { useNavigate } from "react-router-dom";
// import SSEVENT from "./ssEvent";
// import Developer from "./Developer";

// export default function Chatbot(props) {

//   const [Session, setSession] = useState({});

//   async function render(){
//      await getStatus()
//       .then(data => {
//         // Handle the data here
//         setSession(data);
//         // console.log(data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   useEffect(()=>{
//     render();
//   })
  
//   const [isOpen , setIsOpen] = useState(true);
// const toggleSideBar = () =>{
//   setIsOpen(!isOpen);
// }
// const navigate = useNavigate();
// // const userInfo = props.Session.user;
// // console.log(userInfo);
// // logOut

// const logoutSession = async () =>{
//   await logOut()
//   .then(data => {
//     // Handle the data here
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
//   navigate("/login");
//   window.history.replaceState(null,null,'/');
// }
//     return(
//       <div className="container1">
//           <div className={`sidebar ${isOpen ? 'open' : ''}`} >
//           <Nav/>
//           </div>
//         <div className={`box ${isOpen ? 'sideopen' : ''}`}>
//           <div className="head">
//               <button onClick={toggleSideBar}><AiOutlineAlignLeft/></button>
//               <div>
//               <h5>
//                 {Session.user ? Session.user.name : "user"}
//                 </h5>
//               <button onClick={logoutSession}><LogoutRounded/></button>
//               </div>
//           </div>
//             <div className="chatbot">
//               {
//                 props.page === "chatbot" ? (
//                   <Chatbar auth = {Session.user ? Session.user.roles : "user"}/>
//                 ) : props.page === "ssevent" ? (
//                   <SSEVENT auth = {Session.user ? Session.user.roles : "user"}/>
//                 ) : (
//                   <Developer auth = {Session.user ? Session.user.roles : "user"}/>
//                 )
//               }
//             </div>
//         </div>
//       </div>
//     );
// }

import React, { useState, useEffect } from "react";
import Nav from "./navbar";
import Chatbar from "./botcompo/chatmain";
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { LogoutRounded } from "@mui/icons-material";
import { getStatus, logOut } from "../authentication/session";
import { useNavigate } from "react-router-dom";
import SSEVENT from "./ssEvent";
import Developer from "./Developer";

export default function Chatbot(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [session, setSession] = useState({ user: { name: '' } });
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  }

  const logoutSession = async () => {
    await logOut()
      .then(data => {
        // Handle the data here
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    navigate("/login");
    window.history.replaceState(null, null, '/');
  }

  useEffect(() => {
    async function fetchSession() {
      try {
        const data = await getStatus();
        setSession(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchSession();
  }, []);

  const auth = session.user ? session.user.roles : "user";

  return (
    <div className="container1">
      <div className={`sidebar ${isOpen ? 'open' : ''}`} >
        <Nav />
      </div>
      <div className={`box ${isOpen ? 'sideopen' : ''}`}>
        <div className="head">
          <button onClick={toggleSideBar}><AiOutlineAlignLeft /></button>
          <div>
            <h5>{session.user ? session.user.name : "user"}</h5>
            <button onClick={logoutSession}><LogoutRounded /></button>
          </div>
        </div>
        <div className="chatbot">
          {props.page === "chatbot" ? (
            <Chatbar auth={auth} />
          ) : props.page === "ssevent" ? (
            <SSEVENT auth={auth} />
          ) : (
            <Developer auth={auth} />
          )}
        </div>
      </div>
    </div>
  );
}
