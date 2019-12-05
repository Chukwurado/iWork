import axios from "axios";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_START,
    USER_LOADED,
    AUTH_ERROR
} from "./types";

//Sets the x-auth-token header like we would do in postman
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};

const authStart = () => {
    return {
        type: AUTH_START
    };
};

//Used to load and authenticate a user
//This would be called in App.js because it needs to be called in every pages
export const loadUser = () => {
    return async dispatch => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get("/api/auth/user");
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };
};

//Register User
export const register = ({ firstName, lastName, email, password }) => {
    return async dispatch => {
        dispatch(authStart());
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const body = JSON.stringify({
                firstName,
                lastName,
                email,
                password
            });
            const res = await axios.post("api/user", body, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            const errs = err.response.data.errors;
            const errors = {};
            errs.forEach(error => {
                if (error.param === "emailExists") {
                    errors.email = error.msg;
                }
                if (error.param === "firstName") {
                    errors.firstName = error.msg;
                }
                if (error.param === "lastName") {
                    errors.lastName = error.msg;
                }
                if (error.param === "password") {
                    errors.password = error.msg;
                }
                if (error.param === "email") {
                    errors.email = error.msg;
                }
            });
            dispatch({
                type: REGISTER_FAIL,
                payload: errors
            });
        }
    };
};
