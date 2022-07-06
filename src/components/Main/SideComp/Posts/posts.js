/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DATA from '../../../../data/data';
import ChildPosts from './ChildPosts/ChildPosts';
import './posts.scss';

function PostsComp({userID}) {
    const [addBtn, setAddBtn] = useState(false)
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    useEffect(() => {
        const filtered = DATA.posts.filter(post=>{
            return post.userId===userID
        })
        setPosts(filtered)
    }, [userID])

    useEffect(()=>{
        
    },[])

    const AddPost = () => {
        const newPost =  {
            body: body,
            id: DATA.posts.length,
            userId: userID,
            title: title
        }
        DATA.posts.push(newPost);
        setPosts([...posts, newPost])
        setAddBtn(false)
    }
    
    return ( <Container>
        <div className='postsNav'>
            Posts - user {userID} 
            <button className='btn btn-warning' onClick={()=>{
                setAddBtn(true)
            }}>add</button>
        </div>
        <div className='wrapper'>
            {
                !addBtn && posts && posts.map((post, index)=>{
                    return <ChildPosts 
                            key={index}
                            postID={post.userId} 
                            title={post.title} 
                            body={post.body}
                            ></ChildPosts>

                })
            }
            {
                addBtn && <Container className='my-3'>
                <Container>
                    <div className='myGrid'>
                        <span className=''>Title:</span> 
                        <input className='' type="text" onChange={(e)=>{
                                setTitle(e.target.value)
                        }}/>
                    </div>
                    <div className='myGrid'>
                        <span className=''>Body:</span> 
                        <input className='' type="text" onChange={(e)=>{
                                setBody(e.target.value)
                        }}/>
                    </div>
                </Container>
                <div className='my-3' style={{display: 'flex', justifyContent:'flex-end'}}>
                    <Button 
                        className='mx-2' 
                        variant='warning' 
                        onClick={()=>{
                            setAddBtn(false)
                        }}>Cancle</Button>
                <Button 
                    variant='warning' 
                    onClick={AddPost}>Add</Button>
                </div>
                
                </Container>
            }
        </div>
    </Container> );
}

export default PostsComp;