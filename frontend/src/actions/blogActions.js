import axios from 'axios'
import { BLOGS_CREATE_FAIL, BLOGS_CREATE_REQUEST, BLOGS_CREATE_SUCCESS, BLOGS_DELETE_FAIL, BLOGS_DELETE_REQUEST, BLOGS_DELETE_SUCCESS, BLOGS_LIST_FAIL, BLOGS_LIST_REQUEST, BLOGS_LIST_SUCCESS, BLOGS_UPDATE_FAIL, BLOGS_UPDATE_REQUEST, BLOGS_UPDATE_SUCCESS } from '../constants/blogConstants'

export const listBlog = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BLOGS_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/blogs`, config);
        dispatch({
            type: BLOGS_LIST_SUCCESS, payload: data,
        })


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: BLOGS_LIST_FAIL,
            payload: message,
        })
    }
}

export const createBlog = (title, caption, desc, pic, category) => async (dispatch, getState) => {

    try {
        dispatch({
            type: BLOGS_CREATE_REQUEST,
        });
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/blogs/create`, { title, caption, desc, pic, category },
            config)

        dispatch({
            type: BLOGS_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: BLOGS_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateBlog = (id, title, caption, desc, pic, category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOGS_UPDATE_REQUEST,
        });
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/blogs/${id}`, { title, caption, desc, pic, category },
            config)


        dispatch({
            type: BLOGS_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: BLOGS_UPDATE_FAIL,
            payload: message,
        })
    }
}
export const deleteBlog = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOGS_DELETE_REQUEST,
        });
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/blogs/${id}`,
            config)


        dispatch({
            type: BLOGS_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: BLOGS_DELETE_FAIL,
            payload: message,
        })
    }
}
