import { GLOBAL_BLOGS_LIST_FAIL, GLOBAL_BLOGS_LIST_REQUEST, GLOBAL_BLOGS_LIST_SUCCESS } from "../constants/globalConstants";

export const globalBlogListReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
        case GLOBAL_BLOGS_LIST_REQUEST:
            return { loading: true };
        case GLOBAL_BLOGS_LIST_SUCCESS:
            return { loading: false, blogs: action.payload };
        case GLOBAL_BLOGS_LIST_FAIL:
            return { loading: false, error: action.payload };



        default:
            return state;
    }
}
