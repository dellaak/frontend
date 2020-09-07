/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";
import {authHeader} from "../utils/utils"
export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-expiration-date";



const authorizationService = {
  
  add: (data,callback)=> {
    Axios.post(API.socials.add,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response,null)
      })
      .catch(error => {
        
        callback(null,error.response.data.message);
      });
  },
  update: (data,callback)=> {
    Axios.post(API.socials.update,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response,null)
      })
      .catch(error => {
        
        callback(null,error.response.data.message);
      });
  },
  remove: (id,username, callback) => {
    Axios.post(API.socials.remove,{id:id, username:username},{
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  }
 
};

export default authorizationService;
