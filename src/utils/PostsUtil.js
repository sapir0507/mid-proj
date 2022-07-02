/* eslint-disable no-unused-vars */
import env from "../env/env";
import axios from "axios";

const URL = env.POSTS;

const getPosts = () => {
    return axios.get(URL);
}

const PostUtils = {
    getPosts
}

export default PostUtils;