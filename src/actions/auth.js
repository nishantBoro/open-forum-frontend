import axios from "axios";
import { SET_CURRENT_USER } from "../constants/actionTypes";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => (dispatch) => {
  axios
    .post("/api/users", user)
    .then((res) => history.push("/login"))
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post("/auth/signin", user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};
