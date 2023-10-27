import React from "react";
import { sideBar } from "./nav";

export default function Head(){
    console.log("sidebar in :- "+sideBar);

    return (
        <div className="head">
            <h5>ChatBot</h5>
            {/* <button onClick={toggleSideBar()} className="toggle-
            "><KeyboardArrowRightSharp/></button> */}
            {/* <button onClick={tag(sideBar === true ? false : true)}><AiOutlineAlignLeft/></button> */}
        </div>
    )
}