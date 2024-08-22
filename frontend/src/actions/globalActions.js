import axios from "axios";
import { GLOBAL_BLOGS_LIST_FAIL, GLOBAL_BLOGS_LIST_REQUEST, GLOBAL_BLOGS_LIST_SUCCESS } from "../constants/globalConstants";


export const globalListBlog = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBAL_BLOGS_LIST_REQUEST });



        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.get(`/api/blogs/global`, config);
        dispatch({
            type: GLOBAL_BLOGS_LIST_SUCCESS, payload: data,
        })


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: GLOBAL_BLOGS_LIST_FAIL,
            payload: message,
        })
    }
}
