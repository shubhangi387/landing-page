import React, { useEffect, useState } from "react";
import { Bar } from "./barchar";
import MyPieChart from "./dought";
import Lines from "./lines";
import Radar from "./spiderChart";
import FeedLine from "./FeedLine";
import Bump from "./bumpline";
import Feedset from "./DataCollection/FeedData";
import WrongSet from "./DataCollection/wrongData";
// import Bump from "./bumpline";
//var CanvasJSReact = require('@canvasjs/react-charts');

export default function Chatbar(props) {
    const [studentData,setStudent] = useState([]);
    const [badData,setBad] = useState([]);
    const [goodData,setGood] = useState([]);
    const [feedData,setFeed] = useState([]);
    const [wrongData,setWrong] = useState([]);
    useEffect(()=>{
        fetch("http/studentAPI")
        .then(response => response.json())
        .then(data => setStudent(data))
    },[]);
    useEffect(()=>{
            fetch("/badAPI")
            .then(response => response.json())
            .then(data => setBad(data))
    },[]);
    useEffect(()=>{
        fetch("/goodAPI")
        .then(response => response.json())
        .then(data => setGood(data))
    },[]);
    useEffect(()=>{
        fetch("/feedAPI")
        .then(response => response.json())
        .then(data => setFeed(data))
    },[]);
    useEffect(()=>{
        fetch("/wrongAPI")
        .then(response => response.json())
        .then(data => setWrong(data))
    },[]);

    // data structured for the feedlines graph
    

    var allRating = 0;
    feedData.forEach((data)=>{
        allRating += data.Rating;
    })
    var CatFeed = {};
    feedData.forEach((data)=>{
        if(CatFeed[data.Catagory]){
            CatFeed[data.Catagory] = CatFeed[data.Catagory] + 1;
        } else {
            CatFeed[data.Catagory] = 1;
        }
    })
    var baddata = badData.length;
    return(
        <>
        <div className="chatbar">
            <div className="">
                <div className="container-fluid">
                    <div className="row doughnut">
                        <div className="col-6 col-sm-6 col-md-3" style={{borderRadius:".2em" ,padding:"0" }}>
                            <MyPieChart bad={baddata} good={goodData.length} name={"badgood"}/>
                            {/* <h5 style={{color:"#176B87",textAlign:"center"}}>Bad vs Good</h5> */}
                        </div>
                        <div className="col-6 col-sm-6 col-md-3" style={{borderRadius:".2em" ,padding:"0" }} >
                            <MyPieChart feed={feedData.length} feedrate={allRating} name="feddback"/>
                            {/* <h5 style={{color:"#176B87",textAlign:"center"}}>Bad vs Warning</h5> */}
                        </div>
                        <div className="col-6 col-sm-6 col-md-3" style={{borderRadius:".2em" ,padding:"0" }}>
                            <MyPieChart baddata={baddata} wrong={ wrongData.length } name = "wrongAnswers"/>
                            {/* <h5 style={{color:"#176B87",textAlign:"center"}}>Feed Data</h5> */}
                        </div>  
                        <div className="col-6 col-sm-6 col-md-3" style={{borderRadius:".2em" ,padding:"0" }}>
                            <MyPieChart sugg={CatFeed.Suggestion} compliment={CatFeed.Compliment} something={CatFeed["Something Is Not Quite Right"]} name="feedCat" />
                            {/* <h5 style={{color:"#176B87",textAlign:"center"}}>FeedBack</h5> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-12"  style={{borderRadius:".2em"  ,padding:"0"}}>
                            <Bar wrong={wrongData.length}/>
                            {/* <Lines/> */}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12" style={{borderRadius:".2em" ,padding:"0" }}>
                        <Lines/>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* <Radar/> */}
            <div className="">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-12" style={{borderRadius:".2em"  ,padding:"0" }}>
                            <FeedLine name="feedline"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12" style={{borderRadius:".2em"   ,padding:"0"}}>
                            <Feedset/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header"><h2>Correction Data</h2></div>
            <div className="">
                <div className="container-fluid">
                    <div  className="row">
                        <div className="col-md-6 col-sm-12 col-12" style={{ borderRadius:".2em",padding:"0" }}>
                            <FeedLine name="wrong"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12" style={{borderRadius:".2em" ,padding:"0"}}>
                            <WrongSet name="wrong"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-12" style={{ borderRadius:".2em",padding:"0" }}>
                        <WrongSet name="bad"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12" style={{borderRadius:".2em" ,padding:"0"}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}