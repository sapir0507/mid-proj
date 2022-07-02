/* eslint-disable no-unused-vars */
import PostUtils from "./postsUtil";
import TodoUtils from "./TodosUtil";
import UserUtils from "./usersUtil";
import axios from 'axios';

const getUsers = async() => { 
   
    const users$ = await UserUtils.GetUsers();
    const users = users$.data;

}

const getPosts = async() => { 

    const posts$ = await PostUtils.getPosts();
    const posts = posts$.data;
    

}

const getTodos = async() => { 
    const todos$ = await TodoUtils.getTodos();
    const todos = todos$.data;
}



const Utils = {}
export default Utils;