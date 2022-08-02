import React, { useState, useEffect } from "react";
import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import {
  SET_TOKEN,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  GET_CLIENTS,
  USERS_ERROR,
  GET_CLIENTS_TRAITS
} from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "./Utils";
import { propTypes } from "react-bootstrap/esm/Image";
import HomePage from "./HomePage";

axios.defaults.baseURL = "http://192.168.128.184:8002/";

export const login = (userData, redirectTo) => (dispatch) => {
  console.log(userData);

  axios
    .post("/api/v1/token/login/", userData)
    .then((response) => {
      const { auth_token } = response.data;
      setAxiosAuthToken(auth_token);
      dispatch(setToken(auth_token));
      dispatch(getCurrentUser(redirectTo));
      dispatch(getClientTraits(auth_token));
      dispatch(getUsers(auth_token));

    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const getCurrentUser = (redirectTo) => (dispatch) => {
  axios
    .get("/api/v1/users/me/")
    .then((response) => {
      const user = {
        username: response.data.username,
        email: response.data.email,
      };
      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const setCurrentUser = (user, redirectTo) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });

  console.log("set user" + redirectTo);
  if (redirectTo !== "") {
    dispatch(push(redirectTo));
  }
};

export const setToken = (token) => (dispatch) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};
export const PI = [];

export const getClients = () => (dispatch) => {
      axios
        .get("/api/v1/administrate/" + 5)
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: GET_CLIENTS,
            payload: response.data,
          });
        })
        .catch((error) => {
          toastOnError(error);
        });
}
  


export const unsetCurrentUser = () => (dispatch) => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER,
  });
};

export const logout = () => (dispatch) => {
  axios
    .post("/api/v1/token/logout/")
    .then((response) => {
      dispatch(unsetCurrentUser());
      dispatch(push("/"));
      toast.success("Logout successful.");
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/administrate/');
    console.log(res.data)
    dispatch({
      type: GET_CLIENTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(unsetCurrentUser());
    toastOnError(e);
  }
};
export const getClientTraits = () => async (dispatch) => {
  const clientId = localStorage.getItem('clientID')
 // console.log(clientId)
  try {
    const res = await axios.get("/api/v1/administrate/");
   // console.log(res.data);
    dispatch({
      type: GET_CLIENTS_TRAITS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(unsetCurrentUser());
    toastOnError(e);
  }

}

export default login;
