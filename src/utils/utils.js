import { SESSION_TOKEN_KEY } from "../services/authService";
export const updateObject = (previousObject, updatedProperties) => {
  return {
    ...previousObject,
    ...updatedProperties
  };
};


export const authHeader = () => {
  // return authorization header with jwt token
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};
  
  export const parseDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("/");
  };
  