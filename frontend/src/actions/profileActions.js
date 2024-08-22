import axios from 'axios'
import { PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_GET_FAIL, PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS } from '../constants/profileConstants'

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_GET_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`${API_BASE_URL}/api/profile`, config);
        dispatch({
            type: PROFILE_GET_SUCCESS, payload: data,
        })


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: PROFILE_GET_FAIL,
            payload: message,
        })
    }
}

export const createProfile = (name, career, bio, work, education, skill, prof_pic) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_BASE_URL}/api/profile/create`, { name, career, bio, work, education, skill, prof_pic }, config);
        dispatch({
            type: PROFILE_CREATE_SUCCESS, payload: data,
        })


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;

        dispatch({
            type: PROFILE_CREATE_FAIL,
            payload: message,
        })
    }
}