/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import DATA from "../../../../../data/data";
import OtherData from "./OtherData/otherData";
import './UserDataComp.scss';

var classNames = require('classnames');


function UserDataComp({userID, name, email, myClasses, currentSelectedUser, updateData, deleteData, userSelected, changeClass}) {
    const [toggleOtherData, setToggleOtherData] = useState(false)
    const [UserName, setUserName] = useState(name)
    const [UserEmail, setUserEmail] = useState(email)
    const [_class, set_Class] = useState(classNames({
        userSelected: currentSelectedUser===userID,
        borderRed: true,
        borderGreen: false 
    }))

    useEffect(() => {
      setUserName(name)
      setUserEmail(email)
    }, [email, name])

    useEffect(()=>{
        const data1 = DATA.todos.filter(todo=>todo.userId===userID)
        const data2 = data1.filter(todo=>todo.completed===true)
        
        if(data1.length>0 && data2.length>0)
        {
            let myclass = classNames({
                            userSelected: currentSelectedUser===userID,
                            borderRed: data1.length!==data2.length,
                            borderGreen: data1.length===data2.length 
            })
            set_Class(myclass)
        }
        
    },[changeClass, currentSelectedUser, userID])
    

    const userSelected1 = (id) =>{  
        userSelected(id, userID) 
    }

    const deleteUser = () => {
        const users = DATA.users.filter((item)=>item.id!==userID)
        DATA.users = users;
        const userData = users.map((data)=>{
            return {name: data.name, email: data.email, userID: data.id}
        })
        deleteData(userData);
    }

    const updateUser = () => {
        const users = DATA.users.map((item)=>{
            return  item.id === userID? 
            {...item, 
            userID: item.id,
            name: UserName, 
            email: UserEmail} : {...item}
        })
        DATA.users = users;
        updateData(users);
    }
    
    return ( 
    <Container className={`${_class}`}>
            <table id="userDataComp">
                <tbody>
                    <tr onClick={()=>{
                        userSelected1(userID)
                    }}>
                        <td>ID: </td>
                        <td>{userID}</td>
                    </tr>
                    <tr>
                        <td>Name: </td>
                        <td><input
                        type="text" name="user name" id="user name"
                        value={UserName} 
                        onChange={(e)=>{setUserName(e.target.value)}}
                        /></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type='email' name="email" id="user email" 
                        value={UserEmail} 
                        onChange={(e)=>{setUserEmail(e.target.value)}}/></td>
                    </tr>  
                </tbody>
            </table>
            <div className="container-fluid my-2">
                <button className="btn btn-sm btn-secondary mx-2" onMouseOver={()=>{setToggleOtherData(true)}}>Other Data</button>
            </div>
            {toggleOtherData && 
            <OtherData 
                userID={userID} 
                toggleOtherDataComponent={setToggleOtherData}
            ></OtherData>}
            <div className="container-fluid my-2">
                <button className="btn btn-sm btn-warning" onClick={()=>{updateUser()}}>Update</button>
                <button className="btn btn-sm btn-warning mx-1" onClick={()=>{deleteUser()}}>Delete</button>
            </div>
            
    </Container> );
}

export default UserDataComp;