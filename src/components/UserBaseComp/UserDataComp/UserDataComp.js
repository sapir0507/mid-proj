/* eslint-disable no-unused-vars */
import { useState } from "react";
import Container from "react-bootstrap/Container";
import OtherData from "../../OtherData/otherData";
import './UserDataComp.scss';

function UserDataComp({userID, name, email}) {
    const [toggleOtherData, setToggleOtherData] = useState(false)
    const [selected, setSelected] = useState(0);
    const userSelected = (id) =>{
        console.log('userSelected', id );
        setSelected(id)

    }
    const getClasses = (id) => {
        return selected===id? "userSelected": "userUnselected"
    }
    return ( 
    <Container className={getClasses(userID)}>
            <table>
                <tbody>
                    <tr onClick={()=>{
                       
                        userSelected(userID)
                    }}>
                        <td>ID: </td>
                        <td>{userID}</td>
                    </tr>
                    <tr>
                        <td>Name: </td>
                        <td><input
                        type="text" name="name" id="user name"
                        value={name} /></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type='email' name="email" id="user email" value={email} /></td>
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
                <button className="btn btn-sm btn-warning">Update</button>
                <button className="btn btn-sm btn-warning mx-1">Delete</button>
            </div>
            
    </Container> );
}

export default UserDataComp;