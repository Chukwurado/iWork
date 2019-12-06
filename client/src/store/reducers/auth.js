import {
    REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    COMPANY_REGISTER_SUCCESS,
    USER_LOGIN_SUCCESS,
    COMPANY_LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_START,
    USER_LOADED,
    LOGOUT,
    COMPANY_LOADED
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    userAuthenticated: localStorage.getItem("userAuthenticated"),
    companyAuthenticated: localStorage.getItem("companyAuthenticated"),
    loading: false,
    errors: null,
    user: null,
    company: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case USER_LOADED:
            localStorage.removeItem("companyAuthenticated");
            localStorage.setItem("userAuthenticated", true);
            return {
                ...state,
                userAuthenticated: true,
                user: payload,
                errors: null,
                loading: false
            };
        case COMPANY_LOADED:
            localStorage.setItem("companyAuthenticated", true);
            localStorage.removeItem("userAuthenticated");
            return {
                ...state,
                companyAuthenticated: true,
                company: payload,
                errors: null,
                loading: false
            };
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            localStorage.setItem("userAuthenticated", true);
            localStorage.removeItem("companyAuthenticated");
            return {
                ...state,
                token: payload.token,
                errors: null,
                loading: false,
                userAuthenticated: true
            };
        case COMPANY_REGISTER_SUCCESS:
        case COMPANY_LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            localStorage.setItem("companyAuthenticated", true);
            localStorage.removeItem("userAuthenticated");
            return {
                ...state,
                token: payload.token,
                errors: null,
                loading: false,
                companyAuthenticated: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userAuthenticated");
            localStorage.removeItem("companyAuthenticated");
            return {
                ...state,
                token: null,
                userAuthenticated: false,
                companyAuthenticated: false,
                loading: false,
                user: null,
                company: null,
                errors: { ...payload }
            };
        default:
            return state;
    }
};
