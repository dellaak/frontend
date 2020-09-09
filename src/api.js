import axios from "axios";

export const API = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh_token: "/auth/refresh_token",
    getuser: "/auth/getuser",
  },
  socials: {
    add: "/socials/add",
    remove: "/socials/remove",
    list: "/socials/list",
    update:"/socials/update",
  },
  public:{
    list:"/:user",
    qrcode:"/generateqr",
    verify:"/verify/:activationtoken"
  },
  users:{
    update:"/user_update",
    updateusername:"/user_updateusername",
    updateUserPassword:"/user_updatepassword"
  }
};

export const Axios = axios.create({
  baseURL: "http://104.248.94.135:6001",
});
