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

    const getBorderColor = async(userID) => {
        const todos = DATA.todos;
        const isFinished = todos.filter(todo => {
            return (todo.userId === userID && todo.completed === false)
        })
        return isFinished.length > 0? true: false;
    }

    const [myClasses, setMyClasses] = useState(classNames({
        userUnselected: true,
        // borderRed: true,
        // borderGreen: false
    }))

    const userSelected=(userID)=>{
        setMyUserSelected(userID)
        const myclass = classNames({
            userSelected: true,
            // borderRed: !!getBorderColor(userID),
            // borderGreen: !getBorderColor(userID)
        })
        setMyClasses(myclass)
        selectedUser(userID)
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
    // useEffect(()=>{

    //     const userIDs = DATA.users.map((user)=>{return user.id});
    //     userIDs.forEach(id => {
    //         const myclass = classNames({
    //             userSelected: true,
    //             borderRed: !!getBorderColor(id),
    //             borderGreen: !getBorderColor(id)
    //         })
    //     });

    //     // setMyClasses(myclass)
    // },[updateTodos])
    
    
    return ( 
    <Container>
       {userData.length > 0 && filteredUserData.map((item, index)=>{
        return <div className="UserInfo" key={index}>
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
            myClasses={updateTodos}
            // myClasses={myUserSelected===item.userID? `${classNames({
            //     userUnselected: false,
            //     borderRed:  !!getBorderColor(item.userID),
            //     borderGreen: !getBorderColor(item.userID)
            // })}`: `userUnselected ${classNames({
            //     userUnselected: true,
            //     borderRed: !!getBorderColor(item.userID),
            //     borderGreen: !getBorderColor(item.userID)
            // })}`}
            userSelected={(userID)=>{
                userSelected(userID)
            }}
            ></UserDataComp>
        </div>
       })}
    </Container> );
}

export default UserBaseComp;