/* eslint-disable no-unused-vars */
import env from "../env/env";
import axios from 'axios';

const URL = env.TODOS;
const getTodos = () => {
    return axios.get(URL);
}
const TodoUtils = {
    getTodos
}

export default TodoUtils;