import {
    REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    COMPANY_REGISTER_SUCCESS,
    AUTH_START,
    USER_LOADED,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    userAuthenticated: localStorage.getItem("user"),
    companyAuthenticated: localStorage.getItem("company"),
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
            return {
                ...state,
                userAuthenticated: true,
                user: payload
            };
        case USER_REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            localStorage.setItem("user", true);
            localStorage.removeItem("company");
            return {
                ...state,
                token: payload.token,
                errors: null,
                loading: false,
                userAuthenticated: true
            };
        case COMPANY_REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            localStorage.setItem("company", true);
            localStorage.removeItem("user");
            return {
                ...state,
                token: payload.token,
                errors: null,
                loading: false,
                companyAuthenticated: true
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("company");
            return {
                ...state,
                token: null,
                userAuthenticated: false,
                loading: false,
                errors: { ...payload }
            };
        case LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("company");
            return {
                ...state,
                token: null,
                userAuthenticated: false,
                companyAuthenticated: false,
                loading: false,
                errors: { ...payload }
            };
        default:
            return state;
    }
};
