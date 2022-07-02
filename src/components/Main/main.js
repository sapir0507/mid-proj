import './main.scss';
import Container from 'react-bootstrap/Container';
import Search from '../Search/Search';
import UserBaseComp from '../UserBaseComp/UserBaseComp';
import { useEffect, useState } from 'react';
import UserUtils from '../../utils/UsersUtil';
import PostUtils from '../../utils/PostsUtil';
import TodoUtils from '../../utils/TodosUtil';
import DATA from '../../data/data';
function MainComp() {
    const [loaded, setLoaded] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    

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
            console.log(DATA);
        }
        if(loaded)
            getData()
    }, [loaded])
    
    return ( 
    <Container>
        {/* phone part */}
        <div className='phone'>
            <Search filterResults={(data)=>{setSearchInput(data)}}></Search> 
            <UserBaseComp searchInput={searchInput}></UserBaseComp>    
        </div>
        
    </Container> 
    );
}

export default MainComp;