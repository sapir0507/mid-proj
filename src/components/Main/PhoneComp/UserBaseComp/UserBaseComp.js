/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import DATA from '../../../../data/data';
import UserUtils from '../../../../utils/UsersUtil';
import './UserBaseComp.scss';
import UserDataComp from "./UserDataComp/UserDataComp";

var classNames = require('classnames');

function UserBaseComp({searchInput, selectedUser, updateTodos, status}) {
    const [myUserSelected, setMyUserSelected] = useState(-1)
    const [userData, setUserData] = useState([])
    const [filteredUserData, setFilteredUserData] = useState([])

    const [myClasses, setMyClasses] = useState(classNames({
        userUnselected: true,
        userSelected: false,
    }))

    const userSelected=(userID)=>{
        const myclass = classNames({
            userSelected: true,
            userUnselected: false,
        })
        setMyClasses(myclass)
        selectedUser(userID)
        setMyUserSelected(userID)
    }

    useEffect(() => {

        const getUsersData = async()=>{
            const data = await UserUtils.GetUserNameIDAndEmail()
            setUserData(data)
            setFilteredUserData(data)
        }

        if(DATA && DATA.users && DATA.users.length > 0){
            const usersdata = [...DATA.users];
            const res = usersdata.map((user)=>{
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userID: user.id
                }
            })
            setUserData(res)
            setFilteredUserData(res)
        }
        else 
            getUsersData()

    }, [])

    useEffect(()=>{
        setUserData(DATA.users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DATA.users])

    useEffect(() => {  
        const FilterData = () => {
            const filteredData = userData.filter(user=>{
                const name = user.name
                const email = user.email
                return ((name.toLowerCase()).includes(searchInput.toLowerCase()) || (email.toLowerCase()).includes(searchInput.toLowerCase()))
            })
            setFilteredUserData(filteredData)
        }      
        FilterData()
    }, [searchInput, userData])

    useEffect(()=>{
        if(status){
            console.log("user base comp, update todos changed")
            updateTodos(false)
        }
    },[status, updateTodos])
    
    
    return ( 
    <Container>
       {userData.length > 0 && filteredUserData.map((item, index)=>{
        return <div className={`UserInfo`} key={index}>
            <UserDataComp 
            userID={item.id} 
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
            changeClass={updateTodos}
            currentSelectedUser = {myUserSelected}
            myClasses={myClasses}
            userSelected={(userID)=>{
                userSelected(userID)
            }}
            ></UserDataComp>
        </div>
       })}
    </Container> );
}

export default UserBaseComp;