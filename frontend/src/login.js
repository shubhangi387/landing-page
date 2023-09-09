import { Instagram, MailOutline, Call } from '@mui/icons-material';
import React ,{useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login1() {
    
  // use navigator
  const navigate = useNavigate();

    const [Tab,setTab] = useState(false);
    const handleTab = ()=>{
        setTab(!Tab);
    }
      const [formData,setData] = useState({
          username:'',
          password:''
      });
  
    const [inputStyle, setInputStyle] = useState({
         border: "none",
         borderBottom:"1.5px solid #F3AA60"
    });
  
    // Sign In data
    const [signData,setSignData] = useState({
      username:'',
      password:'',
      name:''
    });
    const poorPasswordRegex = /^(?!.*(john|password|123456)).*$/;
    const weakPasswordRegex = /^.{6,}$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%^&*])[A-Za-z\d@$!#%^&*]{8,}$/;
    let whitespaceRegExp = /^$|\s+/;
    const [color,setColor] = useState('##F3AA60');
    const [strength,setStrength] = useState('');
    const handleChangeSign = (event)=>{
      const {name,value} = event.target;
      if(name === 'password'){
        if(strongPasswordRegex.test(value)){
          setStrength('strong Password')
          setColor("green");
        } else if(weakPasswordRegex.test(value)){
          setStrength('Weak Password')
          setColor("orange");
        } else if(poorPasswordRegex.test(value)){
          setStrength('poor Password')
          setColor('red')
        } else if(value.match(whitespaceRegExp)){  
          setStrength('password does contain the whitespace');
          setColor("purpel");
        } 
        setSignData((prevData)=>({
          ...prevData,
          [name] : value,
        }));
      }
          else{
        setSignData((prevData)=>({
          ...prevData,
          [name] : value,
      }));
    }
    }
  
    // handle login change
      const handleChange = (event) =>{
          const {name,value} = event.target;
          setData((prevData)=>({
              ...prevData,
              [name] : value,
          }));
      }
      const handleClick = (rout) =>{
        if((rout === 'register' && strength==='strong Password') || rout==='login'){
          if((rout=== 'register' && signData.username!=null && signData.password!=null && signData.name!=null)
          || ((rout=== 'login' && formData.username!=null && formData.password!=null))
          ){
          fetch(`https://sodd-dash-board-mw6e.vercel.app/${rout}`,{
          method:"POST",
          headers:{
          'Content-Type':'application/json'
          },
          credentials:'include',
          body: rout==="login" ? JSON.stringify({
            username:formData.username,
            password:formData.password
            })
            :
            JSON.stringify({
              username:signData.username,
              password:signData.password,
              name:signData.name
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.status);
            if(data.status) {handleTab(); navigate("/chatbot");}
          })
          .catch(err => {
            setData({
              username:'invalid',
              password:'invalid',
            })
            document.querySelector("#notifier") && (document.querySelector("#notifier").innerHTML = 'UserName Is Allready Present');
          setInputStyle({
            border: "none",
            borderRadius: ".2em",
            borderBottom: "1px solid red"
          });
          })
        } else{
          document.querySelector("#notifier").innerHTML && (document.querySelector("#notifier").innerHTML = 'All fields are mandatory');
        }
        }
          else{
            document.querySelector("#notifier").innerHTML && (document.querySelector("#notifier").innerHTML = 'Please Enter Strong Password');
          }
          // } else{
          //     setInputStyle({
          //         border: "1px solid red",
          //         borderRadius: ".2em",
          //    });
          // }
      }
      if(Tab){
          return(
              <div className='app'>
                  <div id='ContactUs' className="Credential">
                    <div>
                        <div className='contForm'>
                            <div>
                                <h4><span style={{borderBottom:"4px solid #F3AA60"}}>SignIn</span></h4>
                                <h6>Sodd Consultancy</h6>
                            </div>
                            <div>
                            <input placeholder='Username' autoComplete='off' type="text" value={signData.username } onChange={handleChangeSign} name='username'/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <input placeholder='Password' autoComplete='off' id='password' type="text"  style={{marginBottom:"0"}}  value={signData.password} onChange={handleChangeSign} name='password'/>
                                <span style={{backgroundColor: color,width:'100%',height:".1em"}}>
                                </span>
                                <span style={{fontSize:'.6em',margin:".5em 0 0 0"}}>{strength}</span>
                            </div>
                            <div>
                            <input placeholder='Name' autoComplete='off' type="text"  style={inputStyle}  value={signData.name} onChange={handleChangeSign} name='name'/>
                            </div>
                            <span id='notifier'></span>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            
                            <button  className='formButton' onClick={()=>handleClick("register")}>Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          )
      } 
      else{return(
        <div className='app'>
            <div id='ContactUs' className="Credential">
                <div>
                    <div className='contForm'>
                        <div>
                            <h4><span style={{borderBottom:"4px solid #F3AA60"}}>LogIn</span></h4>
                            <h6>Sodd Consultancy</h6>
                        </div>
                        <div>
                        <input placeholder='Username'  type="text" autoComplete='off' style={inputStyle} value={formData.username } onChange={handleChange} name='username'/>
                        </div>
                        <div>
                        <input placeholder='Password'  type="password"  style={inputStyle}  autoComplete='off' value={formData.password} onChange={handleChange} name='password'/>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <button className='formButton' onClick={() => handleClick("login")}>Log In</button>
                        
                        </div>
                        <div style={{
                          display:"flex",
                          padding:"1em",
                          flexDirection:"column",
                          justifyContent:"center",alignItems:"center"
                        }
                        }>
                        <p style={{fontSize:".65em"}}>Don't have account</p>
                        <a onClick={handleTab} style={{fontSize:".8em"}}>SignUp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}
