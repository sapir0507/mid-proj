/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import DATA from "../../data/data";
import PostUtils from "../../utils/PostsUtil";
import TodoUtils from "../../utils/TodosUtil";
import UserUtils from "../../utils/UsersUtil";
import './UserBaseComp.scss';
import UserDataComp from "./UserDataComp/UserDataComp";

function UserBaseComp() {
    const [getData, setGetData] = useState(false)
    const [userData, setUserData] = useState([])
    useEffect(() => {
        const getUsersData = async()=>{
            const data = await UserUtils.GetUserNameIDAndEmail()
            setUserData(data)
        }
        
        if(DATA && DATA.users && DATA.users.length > 0){
            const usersdata=DATA.users;
            const res = usersdata.map((user)=>{
                return {
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            })
             setUserData(res)
        }
        else 
            getUsersData()

    }, [])
    
    return ( 
    <Container>
       {userData.length > 0 && userData.map((item, index)=>{
        return <div className="UserInfo" key={index}>
            <UserDataComp userID={item.userID} name={item.name} email={item.email}></UserDataComp>
        </div>
       })}
    </Container> );
}

export default UserBaseComp;