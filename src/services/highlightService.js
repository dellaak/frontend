/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";
import {authHeader} from "../utils/utils"
export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-expiration-date";



const highlightService = {
  
  add: (data,callback)=> {
    Axios.post(API.highlight.add,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response,null)
      })
      .catch(error => {
        
        callback(null,error.response.data.message);
      });
  },
  removeall: (callback) => {
    Axios.post(API.highlight.removeall,{},{
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  remove: (id, callback) => {
    Axios.post(API.highlight.remove,{socialid:id},{
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

export default highlightService;
