/* eslint-disable no-unused-vars */
import env from "../env/env";
import axios from 'axios';
import DATA from "../data/data";

const URL = env.TODOS;

const url = URL.slice(0, URL.length-1)

const getTodos = () => {
    return axios.get(URL);
}

const getIsUnfinishedTodoes = async(id) => {
    const todos = await axios.get(url + `?userId=${id}`)
    
    const finished = todos.data.find(todo => {
        return todo.completed===false
    });
    const isFinished = finished!==undefined?true:false;
    return isFinished
}

const getUserTodos = (id) => {
    return axios.get(url + `?userId=${id}`)
}

const updateTodos = (todoID, newTodo) => {
    DATA.todos.forEach((todo)=>{
        if(todo.id===todoID)
        {
            todo = {...todo, 
                title: newTodo.title,
                completed: newTodo.completed
                  
            }
        }
    })
   // localStorage['todos'] = DATA.todos;
}
const TodoUtils = {
    getTodos,
    getUserTodos,
    updateTodos,
    getIsUnfinishedTodoes
}

export default TodoUtils;