import { PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_GET_FAIL, PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS } from '../constants/profileConstants'

export const profileGetReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_GET_REQUEST:
            return { loading: true };
        case PROFILE_GET_SUCCESS:
            return { loading: false, profile_data: action.payload };
        case PROFILE_GET_FAIL:
            return { loading: false, error: action.payload };



        default:
            return state;
    }
}
export const profileCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST:
            return { loading: true };
        case PROFILE_CREATE_SUCCESS:
            return { loading: false, success: true };
        case PROFILE_CREATE_FAIL:
            return { loading: false, error: action.payload };



        default:
            return state;
    }
}