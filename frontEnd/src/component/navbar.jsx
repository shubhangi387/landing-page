import React from "react";
import './handler';
import { useNavigate } from "react-router-dom";
import { SidebarData} from "./nav";

function Nav(props) {
// const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
const navigate = useNavigate();

    return(
      <>
       
          <div className="topSection">
            <div className="bars">
            {/* <button onClick={toggleSideBar}><AiOutlineAlignLeft/></button> */}
            </div>
              <div className="profile">
                <h5>Dashbords</h5>
              </div>
          </div>
          
          <div className="nav">
            <ul className="sidebarList">
              {SidebarData.map((val,key) => {
                let link = val.link;
                return (
                  <li
                  key={key}
                  className="row"
                  onClick={()=>{navigate(link)}}
                  >
                    <div>{val.title}</div>
                  </li>
                )
              })}
            </ul>
          </div>
       
       </>
    )
}

export default Nav;
