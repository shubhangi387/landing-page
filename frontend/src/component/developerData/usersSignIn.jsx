import React, { useState, useEffect } from "react";
import { Add, Close, CopyAll, DeleteOutline, DeleteOutlineRounded, DeleteOutlined } from "@mui/icons-material";

export default function UserRolls(props) {
  const [admin, setAdmin] = useState(false);
  const [addTest, setAddTest] = useState(false);
  const [UserData, setUserData] = useState("");
  const [User, setUser] = useState([]);
  const [refresher , setRefresher] = useState(false);
  useEffect(() => {
    setUsers();
  },[refresher]);

  useEffect(() => {
    props.auth && props.auth.includes("Admin") ? setAdmin(true) : setAdmin(false);
  }, [props.auth]);

  function setUsers() {
    fetch("/profile")
      .then(response => response.json())
      .then(data => {
        setUser(data.data);
      });
  }
    // for form handle the change in inputs
    const handleChange = (event) =>{
        setUserData(event.target.value);
    }
    let [rolesArray,setRolesArray]= useState([]);
    const addToArray = () => {
        rolesArray.push(UserData);
        setUserData('');
        setRolesArray([...rolesArray]); // Ensure state update triggers re-render
    }

    // data is stored to the database
    const AddRole = (id) => {
        if(admin){
        fetch("/profile", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:"include",
          body: JSON.stringify({
            id:id,
            roles:rolesArray
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === true) {
            // Roles were successfully added
            console.log("Roles added:", data.updatedUser);
            setRefresher(!refresher);
            // Perform actions if roles were added successfully
          } else {
            // Roles addition failed
            console.log("Roles addition failed");
            // Perform actions if roles addition failed
          }
        })
        .catch(error => {
          console.error("Error:", error);
          // Handle the error, e.g., show an error message to the user
        });
    }
    };

    // data is deleted from the database
    const DeleteData = (id) => {
        if(admin){
            fetch("/profile", {
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
          setUsers(); // Update the state with the new data
        //   console.log(data); // Display the updated data
        })
        .catch(error => console.log(error));
        }
      }

    // toggle the tests or add tests
    const toogleTest = () =>{
        setAddTest(!addTest);
    }


    // data copy
    const handleCopy = () =>{
        if(admin){
        const userData = document.querySelectorAll(props.name === "subscribers" ? "#subscribers" : "#users");
        const copiedJson = [...userData].map((value) => {
            return {
                "Name": value.childNodes[0].innerText.replace("Name: ",""),
                "User_name": value.childNodes[1].innerText.replace("UserName: ",""),
                "Roles":value.childNodes[2].innerText.replace("Roles: ",""),
            };
        });
        navigator.clipboard.writeText(JSON.stringify(copiedJson));
        console.log(copiedJson);
    } else{
        console.log("Sorry U dont Have Permissions");
    }
    }

    const [showAdd,setShow] = useState(false);
            return (
                <div className=".data_lines">
                    <div className="dataField">
                        <div className="wrongnav">
                            <h4>{props.name === "subscribers" ? "subscribers" : "Users"} </h4>
                            <div>
                                <button onClick={handleCopy}><CopyAll/></button>
                            </div>
                        </div>
                        {
                            User.map((data, index) => {
                                // console.log(data);
                                if ((props.name === "subscribers" && data.roles.length !== 0) || (props.name !== "subscribers" && data.roles.length === 0)) {
                                return (
                                    <div className="userContainer" key={data._id}>
                                    <div style={{ display: "flex", flexDirection: "row", backgroundColor: "" }}>
                                        {showAdd ? (
                                        <div className="formrole" style={{ flex: "7", display: "flex" }}>
                                            <input type="text" placeholder={rolesArray} onChange={handleChange} value={UserData.roles} name="roles" />
                                                                <div style={{display:"flex"}}>
                                                                    <button 
                                                                    onClick={addToArray}
                                                                    >Add One</button>
                                                                    <button 
                                                                    onClick={() => AddRole(data._id)}
                                                                    >Submit</button>
                                                                    <button 
                                                                    onClick={() => setRolesArray([])}
                                                                    >Renew</button>
                                                                </div>
                                        </div>
                                        ) : (
                                        <div id={props.name === "subscribers" ? "subscribers" : "users"} style={{ flex: "7" }}>
                                            <h5 id="name">Name: {data.name}</h5>
                                            <h5 id="number">UserName: {data.username}</h5>
                                            <h5 id="number">Roles: {data.roles}</h5>
                                        </div>
                                        )}
                                    </div>
                                    <div className="roleCrud" style={{ flex: "3", display: "flex", justifyContent: "flex-end" }}>
                                        <button className="deletBut" onClick={() => setShow(!showAdd)}>
                                        {!showAdd ? <Add /> : <Close />}
                                        </button>
                                        <button className="deletBut" onClick={() => DeleteData(data._id)}>
                                        <DeleteOutlined />
                                        </button>
                                    </div>
                                    </div>
                                );
                                } else {
                                return null; // or any fallback JSX you want for other roles
                                }
                            })
                        }

                    </div>
                </div>
                )
        } 