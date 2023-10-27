import React from 'react';
import Rich from './SSEVENT/rich';
import SseventData from './SSEVENT/sseventData';


export default function SSEVENT(props) {
    return(
        <div className="sseventHome">
            <div className="container-fluid">
                <div className="row divider">
                    <div className='col-md-6 col-sm-12 col-12 '>
                        <div className="heading">
                        <h1>Shri Swami Samartha</h1>
                        <p>You Can See Your Web Site Views Per Day.</p>
                        <p>You can customise the Testimonials.</p>
                        <p>You can call from call button to Customer.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12" style={{ borderRadius:".2em",padding:"0" }}>
                        <Rich/>
                    </div>
                </div>
                <div className="row divider">
                    <div className='col-md-6 col-sm-12 col-12' style={{ borderRadius:".2em",padding:"0" }}>
                        <SseventData auth={props.auth} name="contact"/>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12" style={{ borderRadius:".2em",padding:"0" }}>
                        <SseventData auth={props.auth} name="testimonial"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
