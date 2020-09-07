/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";
import {authHeader} from "../utils/utils"

const userService = {
  
  update: (data,callback)=> {
    Axios.post(API.users.update,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response,null)
      })
      .catch(error => {
        
        callback(null,error.response.data.message);
      });
  },
  updateUsername: (data,callback)=> {
    Axios.put(API.users.updateusername,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        callback(error.response);
      });
  },
  updateUserPassword: (data,callback)=> {
    Axios.put(API.users.updateUserPassword,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        callback(error.response);
      });
  },
 
 
 
};

export default userService;
