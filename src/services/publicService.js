/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";




const publicService = {

  list: (username,callback) => {
    Axios.get(API.public.list.replace(":user", username))
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
  },  
  getQr: (data,callback)=> {
    Axios.post(API.public.qrcode, {username:data})
      .then(response => {
       
        callback(response)
      })
      .catch(error => {
       
        callback(error);
      });
  },
 verify: (token,callback) => {
    Axios.post(API.public.verify.replace(":activationtoken", token))
    .then(response => {

      callback(response);
    })
    .catch(error => {
      callback(error);
    });
  },  
};

export default publicService;
