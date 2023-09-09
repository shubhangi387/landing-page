import React from "react";

export const SidebarData = [
    {
        title:"Developer",
        link:"/developer"
    },
    {
        title:"Chatbot",
        link:"/"
    },
    {
        title: "SS Events",
        link: "/portfolio"
    },
];

export let sideBar;

export const tag = (state) => {
    sideBar = state;
}
