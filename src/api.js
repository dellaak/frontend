import axios from "axios";

export const API = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    signupcompany: "/signup_company",
    refresh_token: "/auth/refresh_token",
    getuser: "/auth/getuser",
  },
  socials: {
    add: "/socials/add",
    remove: "/socials/remove",
    update:"/socials/update",
  },
  highlight: {
    add: "/highlight/add",
    removeall: "/highlight/removeall",
    remove: "/highlight/remove",
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
  },
  buy:{
    create:"/create_customer"
  }
};

export const Axios = axios.create({
  baseURL: "https://app.sharemysocials.com",
  // baseURL: "https://104.248.94.135:6001",
});
