import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function WrongSet(props) {
    
    const [wrongDataSet,setWrong] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:500/wrongAPI")
        .then(response => response.json())
        .then(data => setWrong(data))
    },[]);

    const handleCopy = () =>{
        const userData = document.querySelectorAll("#userData");
        const copiedJson = [...userData].map((value) => {
            return {
                "Answer": " ",
                "Question": value.textContent.replace("User Que : ", "")
            };
        });
        navigator.clipboard.writeText(JSON.stringify(copiedJson));
    }

    // bad Data
    const [badData,setData] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:500/badAPI")
        .then(response => response.json())
        .then(data => setData(data))
    },[]);
    if(props.name === "wrong"){
        return (
            <div className=".data_lines">
                <div className="dataField">
                <div className="wrongnav">
                    <h4> Wrong Answers</h4>
                    <div>
                        <button onClick={handleCopy}><ContentCopyIcon/></button>
                        <button><DeleteOutlineIcon/></button>
                    </div>
                </div>
                {
                    wrongDataSet.map((data,index)=>{
                        return(
                            <div className="dataContainer" key={index}>
                                <div><h5>Predicted Que No : {data.predictedQueNo}</h5> <h5 style={{marginLeft:"auto"}}>Accuracy : {data.accuracy}</h5></div>
                                <div className="transDiv" id="userData"><h5>User Que : {data.userquestion}</h5></div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    } else{
        return (
            <div className=".data_lines">
                <div className="dataField">
                <div className="wrongnav">
                    <h4> Bad Responces</h4>
                    <div>
                        <button onClick={handleCopy}><ContentCopyIcon/></button>
                        <button><DeleteOutlineIcon/></button>
                    </div>
                </div>
                {
                    badData.map((data,index)=>{
                        return(
                            <div className="dataContainer" key={index}>
                                <div><h5>User Que : {data.userInput1}</h5></div>
                                <div className="transDiv" id="userData"><h5>Answer : {data.botResponce1}</h5></div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
    
}
