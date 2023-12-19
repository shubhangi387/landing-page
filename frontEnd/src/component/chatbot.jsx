

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
        console.log(data);
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
