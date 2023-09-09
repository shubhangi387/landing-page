/* eslint-disable import/no-anonymous-default-export */
let openapp=0;
function Chatbot(num) {
    console.log(num);
    openapp = num;
}

export default {Chatbot,openapp};
// const buttons = document.querySelectorAll('navbut');
//     buttons.forEach((button)=>{
//         button.addEventListener("click",function(){
//             console.log(button);
//         })
//     })