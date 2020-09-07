import { combineReducers } from 'redux';
import authReducer from "./authReducer"
import socialsReducer from './socialsReducer';
import publicReducer from './publicReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';


export default combineReducers({
    auth: authReducer,
    socials:socialsReducer,
    public:publicReducer,
    user:userReducer,
    ui:uiReducer
});