import './main.scss';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import DATA from '../../data/data';
import UserUtils from '../../utils/UsersUtil';
import PostUtils from '../../utils/PostsUtil';
import TodoUtils from '../../utils/TodosUtil';
import Search from './Search/Search';
import UserBaseComp from './PhoneComp/UserBaseComp/UserBaseComp';
import TodosComp from './SideComp/Todos/todos';
import PostsComp from './SideComp/Posts/posts';
import NewUserComp from './SideComp/Users/Users';

function MainComp() {
    const [loaded, setLoaded] = useState(false)
    const [isAddUser, setIsAddUser] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [selectedUser, setSelectedUser] = useState(-1)

    useEffect(()=>{
        setLoaded(true)
    },[])

    useEffect(() => {
        const getData = async()=>{
            const users1 = await UserUtils.getUsers();
            const posts = await PostUtils.getPosts();
            const todos = await TodoUtils.getTodos();
            
            DATA.users=users1.data;
            DATA.posts=posts.data;
            DATA.todos=todos.data;

            // localStorage['users'] = users1.data;
            // localStorage['posts'] = posts.data;
            // localStorage['todos'] = todos.data;

        }
        if(loaded)
            getData()
    }, [loaded])

    
    return ( 
    <Container>
        {/* phone part */}
        <div className='gridContainer'>
            <div className='phone'>
                <Search 
                    filterResults={(data)=>{
                        setSearchInput(data)
                    }}
                    createNewUser={()=>{
                        setIsAddUser(true)
                    }}
                ></Search> 
                <UserBaseComp searchInput={searchInput} selectedUser={(data)=>{setSelectedUser(data)}}></UserBaseComp>    
            </div>
            {/* side component */}
            <div className='sideComp'>
            {!isAddUser && selectedUser >= 0 &&
            <div>
                <Container className='mainTodos'>
                    <TodosComp userID={selectedUser}></TodosComp>
                </Container>
                <Container className='mainPosts'>
                    <PostsComp userID={selectedUser}></PostsComp>
                </Container> 
            </div>}
            {isAddUser && <Container>
                 Add New User
                <NewUserComp cancle={()=>{setIsAddUser(false)}}/>
            </Container>
            }
            </div>
        </div>
    </Container> 
    );
}

export default MainComp;