import React from "react";
import {useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Add, Call, Close, Save } from "@mui/icons-material";
export default function SseventData(props) {
    const [addTest,setAddTest] = useState(false);
    const [testData,setTestData] = useState({});
    const [admin,setAdmin] = useState(false);
    useEffect(() => {
        setAdmin(props.auth && (props.auth.includes("Admin") || props.auth.includes("ssevent")));
      }, [props.auth]);
      
    // Testimonials
    const [Testimonial,setTest] = useState([]);
    useEffect(()=>{
        setTestimonials();
    },[]);

    function setTestimonials(){
        fetch("https://sodd-dash-board.vercel.app/testAPI")
        .then(response => response.json())
        .then(data => setTest(data.data))
    }

    // for form handle the change in inputs
    const handleChange = (event) =>{
        const {name,value} = event.target;
        setTestData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    }

    // data is stored to the database
    const submitTest = (event) =>{
        event.preventDefault();
        if(admin){
            fetch("https://sodd-dash-board.vercel.app/testAPI",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:testData.name,
                comment:testData.comment
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log("response from server : ",data);
                setTestimonials();//call this function to update the state to update the new data in data list
                toogleTest();
                // console.log(Testimonial);
            })
            .catch(error => console.log(error))
        }
    }

    // data is deleted from the database
    const DeleteData = (id) => {
        if(admin){
            fetch("https://sodd-dash-board.vercel.app/testAPI", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id
            })
            })
            .then(response => response.json())
            .then(data => {
            setTestimonials(); // Update the state with the new data
            //   console.log(data); // Display the updated data
            })
            .catch(error => console.log(error));
        }
      }
      

    // toggle the tests or add tests
    const toogleTest = () =>{
        setAddTest(!addTest);
    }

    // contact dataset
    const [contacts,setContact] = useState([]);
    useEffect(()=>{
        fetch("/contactAPI")
        .then(response => response.json())
        .then(data => setContact(data))
    },[]);

    // data copy
    const handleCopy = () =>{
        if(admin){
            const userData = document.querySelectorAll("#userData");
            const copiedJson = [...userData].map((value) => {
            return {
                "Name": value.childNodes[0].innerText.replace("Name : ",""),
                "No": value.childNodes[1].innerText.replace("Number: ",""),
                "Event":value.childNodes[2].innerText.replace("Event: ",""),
                "Place":value.childNodes[3].innerText.replace("Place: ",""),
            };
        });
        navigator.clipboard.writeText(JSON.stringify(copiedJson));
        }
    }

    if(props.name === "contact"){
        return (
            <div className="listsSS">
                <div className="dataField">
                <div className="wrongnav">
                    <h4>Costomer's</h4>
                    <div>
                        <button onClick={handleCopy}><ContentCopyIcon/></button>
                    </div>
                </div>
                {
                    contacts.map((data,index)=>{
                        return(
                            <div className="dataContainer" key={index}>
                                <div style={{display:"flex", backgroundColor:""}}>
                                    <div className="transDiv" style={{flex:"9.5"}} id="userData">
                                        <h5 id="name">Name : {admin ? data.name : "John Doe"}</h5>
                                        <h5 id="number">Number: {admin ? data.number : 'XXXXXXXXXX'}</h5>
                                        <h5 id="event">Event: {admin ? data.event : 'Marrage'}</h5>
                                        <h5 id="place">Place: {admin ? data.place : 'paris'}</h5>
                                    </div>
                                    <div className="transDiv" style={{flex:"0.5"}}>
                                        <a href={"tel:+91"+ admin ? data.number : '0000000000'}><Call/></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    } else{
        if(addTest){
            return (
                <div className="listsSS">
                    <div className="dataField">
                    <div className="wrongnav">
                        <h4> Add Testimonials</h4>
                        <div>
                            <button onClick={toogleTest}><Close/></button>
                        </div>
                    </div>
                        <div className="dataContainer">
                            <div className="formTestimonial">
                                <div className="transDiv" style={{flex:"9.5"}} id="userData">
                                    <input type="text" onChange={handleChange} placeholder="Enter Name"  name="name" id="userName" />
                                    <input type="text" onChange={handleChange} placeholder="Enter Comment" name="comment" id="userComm" />
                                </div>
                                <div className="transDiv" style={{flex:"0.5"}}>
                                    <button onClick={submitTest}>Save</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                )
        } else{
            return (
                <div className="listsSS">
                    <div className="dataField">
                    <div className="wrongnav">
                        <h4> Testimonials </h4>
                        <div>
                            <button onClick={toogleTest}><Add/></button>
                        </div>
                    </div>
                    {
                        Testimonial.map((data,index)=>{
                            return(
                                <div className="dataContainer" key={index}>
                                    <div style={{display:"flex", backgroundColor:""}}>
                                        <div className="transDiv" style={{flex:"9.5"}} id="userData">
                                        <h5 id="name">Name : {data.name}</h5>
                                        <h5 id="number">Comment: {data.comment}</h5>
                                        </div>
                                        <div className="transDiv" style={{flex:"0.5"}}>
                                        <button className="deletBut" onClick={ () => DeleteData(data._id)}><DeleteOutlineIcon/></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                )
        }
        
        
    }
    
}
