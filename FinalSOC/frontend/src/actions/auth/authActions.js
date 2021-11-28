import * as types from "../../types/actionTypes";

import { backendUrl } from "../backendUrl";

let url = process.env.REACT_APP_DEV_URL || backendUrl;

function authenticateAction(userData, dispatch, location, push) {
  return async function() {
    if (navigator.cookieEnabled) {
      localStorage.setItem("ecom_token", userData.token);
      localStorage.setItem("user" , userData.username);
    }
    if(userData.username==='admin'){
      if (location === "/login") {
        push("/circulation");
      }
    }
    else{
    if (location === "/login") {
      push("/user");
    }
    }

    return dispatch({ type: types.AUTHENTICATED });
  };
}
function registrationSuccessMessage() {
  return { type: types.REGISTRATION_SUCCESS_MESSAGE };
}

function registerAction(data) {
  return async function() {
    let response = await fetch(`${url}/auth/users/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = response.json();
    return responseJson;
  };
}

function loginAction(data) {
  return async function() {
    let response = await fetch(`${url}/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    responseJson = { ...responseJson , "username":data.username };
    return responseJson;
  };
}

// JWT tokens are not stored in our DB
function logoutAction() {
  localStorage.removeItem("ecom_token");
  localStorage.removeItem("user");
  return { type: types.UNAUTHENTICATED };
}

export {
  registerAction,
  loginAction,
  authenticateAction,
  logoutAction,
  registrationSuccessMessage
};
