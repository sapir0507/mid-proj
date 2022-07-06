import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DATA from '../../../../data/data';
import ChildTodo from './ChildTodo.js/ChildTodo';
import './todos.scss';

function TodosComp({userID}) {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [createNewTodo, setCreateNewTodo] = useState(false)
    useEffect(() => {
        const loadTodos = async() => {
            const todos = DATA.todos.filter(todo=>todo.userId===userID)
            setTodos(todos)
        }
        if(createNewTodo===false) 
            loadTodos()
    }, [userID, createNewTodo])

    const AddTodo = () => { 

        const newTodo = {
            userId: userID,
            id: DATA.todos.length + 1,
            title: title,
            completed: false,
        }

        DATA.todos.push(newTodo)
        setCreateNewTodo(false);
     }
    
    return ( <Container>
       <div className='todosNav'> 
            todos - user {userID} 
            {!createNewTodo && 
                <button className='btn btn-warning' onClick={()=>{setCreateNewTodo(true)}}>add</button>
            }
       </div>
        <div className='wrapper'>
            
            {!createNewTodo && todos && todos.map((todo, index)=>{
                return <ChildTodo 
                            key={index}
                            todoId={todo.userId} 
                            title={todo.title} 
                            completed={todo.completed? "True": "False"}
                        ></ChildTodo>

            })}

            {createNewTodo &&  
            <div className='my-3'>
                <Container>
                    <div className='myGrid'>
                        <span className=''>Title:</span> 
                        <input className='' type="text" onChange={(e)=>{
                                setTitle(e.target.value)
                            }}/>
                    </div>
                </Container>
                <div className='my-3' style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button className='mx-2' variant='warning' onClick={()=>{setCreateNewTodo(false)}}>Cancle</Button>
                <Button variant='warning' onClick={AddTodo}>Add</Button>
                </div>
                
            </div>}
        </div>
    </Container> );
}

export default TodosComp;