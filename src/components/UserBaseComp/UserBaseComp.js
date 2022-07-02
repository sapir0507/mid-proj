/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import DATA from "../../data/data";
import UserUtils from "../../utils/UsersUtil";
import './UserBaseComp.scss';
import UserDataComp from "./UserDataComp/UserDataComp";
var classNames = require('classnames');

function UserBaseComp({searchInput}) {
    const [myUserSelected, setMyUserSelected] = useState(-1)
    const [userData, setUserData] = useState([])
    const [filteredUserData, setFilteredUserData] = useState([])


    const getBorderColor = async(userID) => {
        const todos = DATA.todos;
        const isFinished = todos.filter(todo => {
            return (todo.userId === userID && todo.completed === false)
        })
        return isFinished.length > 0? true: false;
    }

    const [myClasses, setMyClasses] = useState(classNames({
        userUnselected: true,
        borderRed: true,
        borderGreen: false
    }))

    const userSelected=(id)=>{
        console.log("hello from parent of id: ", id)
        setMyUserSelected(id)
        const myclass = classNames({
            userSelected: true,
            borderRed: !!getBorderColor(id),
            borderGreen: !getBorderColor(id)
        })
        setMyClasses(myclass)
    }

    useEffect(() => {
        const getUsersData = async()=>{
            const data = await UserUtils.GetUserNameIDAndEmail()
            setUserData(data)
            setFilteredUserData(data)
        }
        
        if(DATA && DATA.users && DATA.users.length > 0){
            const usersdata = DATA.users;
            const res = usersdata.map((user)=>{
                return {
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            })
             setUserData(res)
             setFilteredUserData(res)
        }
        else 
            getUsersData()

    }, [])

    useEffect(() => {
        if(searchInput!=='')
        {
            const filteredData = userData.filter(user=>{
                const name = user.name
                const email = user.email
                return ((name.toLowerCase()).includes(searchInput.toLowerCase()) || (email.toLowerCase()).includes(searchInput.toLowerCase()))
            })
            console.log("filtered data:", filteredData)
            setFilteredUserData(filteredData)
        }
        else{
            setFilteredUserData(userData)
        }
    }, [searchInput])
    
    
    return ( 
    <Container>
       {userData.length > 0 && filteredUserData.map((item, index)=>{
        const border = classNames({
            userUnselected: true,
            borderRed: !!getBorderColor(item.id),
            borderGreen: !getBorderColor(item.id)
        })
        return <div className="UserInfo" key={index}>
            <UserDataComp 
            userID={item.userID} 
            name={item.name} 
            email={item.email}
            updateData={(data)=>{
                setUserData(data); 
                setFilteredUserData(data);
            }}
            deleteData={(data)=>{
                setUserData(data); 
                setFilteredUserData(data);
            }}
            myClasses={myUserSelected===item.userID? myClasses: 'userUnselected borderRed'}
            userSelected={(id)=>{
                userSelected(id)
            }}
            ></UserDataComp>
        </div>
       })}
    </Container> );
}

export default UserBaseComp;