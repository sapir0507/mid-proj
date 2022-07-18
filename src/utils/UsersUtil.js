/* eslint-disable no-unused-vars */
import env from "../env/env";
import axios from 'axios';

const URL = env.USERS;

const getUsers = () => {
    return axios.get(URL)
}


const getUser = (id) => {
    return axios.get(URL + id);
}


const getUserEmail = async (id) => {
    const user = await axios.get(URL + id);
    const data = user.data;
    return data.email;
}

const getUserName = async (id) => {
    const user = await axios.get(URL + id);
    const data = user.data;
    return data.name;
}

const getOtherData = async(id)=>{
    const user = await axios.get(URL + id);
    const data = user.data;
    const otherData = {
        street: data.address.street,
        city: data.address.city,
        zipCode: data.address.zipcode
    }
    return otherData;
}

const GetUserNameIDAndEmail = async() => {
    const users = await axios.get(URL);
    const data = users.data;
    const item = data.map((user)=>{
        return {
            id: user.id,
            userID: user.id,
            name: user.name,
            email: user.email
        }
    })
    return item;
}
const UserUtils = {
    getUsers,
    getUser,
    getUserEmail,
    GetUserNameIDAndEmail,
    getOtherData,
    getUserName
}

export default UserUtils;