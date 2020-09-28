/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";
import {authHeader} from "../utils/utils"

const storeService = {
  
  create: (data,callback)=> {
    Axios.post(API.buy.create,data, {
      headers: authHeader()
    })
      .then(response => {
        callback(null,response)
      })
      .catch(error => {
        
        callback(error)
      });
  }
 
};

export default storeService;
