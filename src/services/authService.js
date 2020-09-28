/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "../api";
export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-expiration-date";


const authorizationService = {
  
  signup: (data,callback)=> {
    Axios.post(API.auth.signup, data)
      .then(response => {
        callback(null,response)
      })
      .catch(error => {
      
          callback(error.response.data,null);
      
        
      });
  },
  signupcompany: (data,callback)=> {
    Axios.post(API.auth.signupcompany, data)
      .then(response => {
        callback(null,response)
      })
      .catch(error => {
      
          callback(error.response.data,null);
      
        
      });
  },
  login: (email, password, callback) => {
    Axios.post(API.auth.login, {
      email: email,
      password: password
    })
      .then(response => {
        const expirationDate = new Date(response.data.message.expires);
        sessionStorage.setItem(SESSION_TOKEN_KEY, response.data.message.token);
        sessionStorage.setItem(SESSION_TOKEN_EXPIRATION_DATE_KEY, expirationDate);
        callback(response);
      })
      .catch(error => {
        callback(error.response);
      });
  },
  getSessionToken: () => {
    return sessionStorage.getItem(SESSION_TOKEN_KEY);
  },
  isAuthenticated: () => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    return (
      token && new Date().getTime() <= new Date(sessionStorage.getItem(SESSION_TOKEN_EXPIRATION_DATE_KEY)).getTime()
    );
  },
  removeToken: () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
    window.location.href = "/login";
  },
  getUser: (data,callback)=> {
    Axios.post(API.auth.getuser, {token:data})
      .then(response => {
        callback(response)
      })
      .catch(error => {
        
        callback(error);
      });
  },
};

export default authorizationService;
