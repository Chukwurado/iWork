import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_START } from "./types";

const authStart = () => {
    return {
        type: AUTH_START
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
