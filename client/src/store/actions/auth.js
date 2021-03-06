import axios from "axios";
import {
    REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    COMPANY_REGISTER_SUCCESS,
    USER_LOGIN_SUCCESS,
    COMPANY_LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_START,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    COMPANY_LOADED
} from "./types";

//Sets the x-auth-token header like we would do in postman
export const setAuthToken = token => {
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
export const authenticate = isUser => {
    return async dispatch => {
        setAuthToken(localStorage.token);
        try {
            const endPoint = isUser ? "user" : "company";
            const res = await axios.get("/api/auth/" + endPoint);
            dispatch({
                type: isUser ? USER_LOADED : COMPANY_LOADED,
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
export const register = (
    { firstName, lastName, email, name, password },
    isJobSeeker
) => {
    return async dispatch => {
        dispatch(authStart());
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            let body = JSON.stringify({
                firstName,
                lastName,
                email,
                password
            });
            if (!isJobSeeker) {
                body = JSON.stringify({
                    name,
                    email,
                    password
                });
            }

            const endPoint = isJobSeeker ? "user/" : "company/";
            const res = await axios.post(`api/${endPoint}`, body, config);
            dispatch({
                type: isJobSeeker
                    ? USER_REGISTER_SUCCESS
                    : COMPANY_REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            const errs = err.response.data.errors;
            console.log(errs);
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
                if (error.param === "name") {
                    errors.name = error.msg;
                }
            });
            dispatch({
                type: REGISTER_FAIL,
                payload: errors
            });
        }
    };
};

export const login = ({ email, password }, isJobSeeker) => {
    return async dispatch => {
        dispatch(authStart());
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({ email, password });
        const routeName = isJobSeeker ? "user/" : "company/";

        try {
            const res = await axios.post(`api/auth/${routeName}`, body, config);
            console.log(res.data);
            dispatch({
                type: isJobSeeker ? USER_LOGIN_SUCCESS : COMPANY_LOGIN_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            const errs = err.response.data.errors;
            console.log(errs);
            const errors = {};
            errs.forEach(error => {
                if (error.param === "invalidCredentials") {
                    errors.invalidCredentials = error.msg;
                }
                if (error.param === "password") {
                    errors.password = error.msg;
                }
                if (error.param === "email") {
                    errors.email = error.msg;
                }
            });
            dispatch({
                type: LOGIN_FAIL,
                payload: errors
            });
        }
    };
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
