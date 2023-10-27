import React from 'react';
import Rich from './SSEVENT/rich';
import SseventData from './SSEVENT/sseventData';
import UserRolls from './developerData/usersSignIn';


export default function Developer(props) {
    var data = props.auth;
    return(
        <div className="sseventHome">
            <div className="container-fluid">
                <div className="row divider">
                    <div className='col-md-6 col-sm-12 col-12 '>
                        <div className="heading">
                        <h1>Sodd Consultancy</h1>
                        <p>IT Technologies</p>
                        <p>Developer can assign the roles to user.</p>
                        <p>In subscribers the people have there Websites Ownerships.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12">
                            {
                            data ? 
                            data.includes("Admin") ? (
                            <div className='heading'>
                                <h1>WelCome Siddhant</h1>
                                <p>Boss, I'm Always trying to give facilities to the People</p>
                            </div>
                            ) : (
                                <div className='heading'>
                                    <h1>Developed By Siddhant</h1>
                                    <p>To Give the costomizable websites to Customers</p>
                                </div>
                                ) : null
                            }
                    </div>
                </div>
                <div className="row divider">
                    <div className='col-md-6 col-sm-12 col-12' style={{ borderRadius:".2em",padding:"0" }}>
                    <UserRolls auth={props.auth ? props.auth : ["Guest"]}/>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12" style={{ borderRadius:".2em",padding:"0" }}>
                    <UserRolls name="subscribers" auth={props.auth ? props.auth : ["Guest"]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
