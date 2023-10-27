import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Feedset() {
    const [feedData,setFeed] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:500/feedAPI")
        .then(response => response.json())
        .then(data => setFeed(data))
    },[]);
    // console.log(feedData);
    return (
        <div className=".data_lines">
            <div className="dataField">
            <h4> FeedBacks</h4>
            {
                feedData.map((data,index)=>{
                    return(
                        <div className="dataContainer" key={index}>
                            <div><h5>Rating : {data.Rating}</h5> <h5 style={{marginLeft:"auto"}}>Catagory : {data.Catagory}</h5></div>
                            <div className="transDiv"><h5>FeedBack : {data.feedText}</h5></div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
