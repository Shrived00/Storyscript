import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/useReducers';
import { blogCreateReducer, blogDeleteReducer, blogListReducer, blogUpdateReducer } from './reducers/blogReducer';
import { globalBlogListReducer } from './reducers/globalReducers';
import { profileCreateReducer, profileGetReducer } from './reducers/profileReducer';

const reducer = combineReducers({
    //this will contain reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    blogList: blogListReducer,
    blogCreate: blogCreateReducer,
    globalBlogList: globalBlogListReducer,
    blogUpdate: blogUpdateReducer,
    blogDelete: blogDeleteReducer,
    profileGet: profileGetReducer,
    profileCreate: profileCreateReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middlerware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlerware))
);

export default store;