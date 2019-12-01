import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_START } from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    errors: null
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
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                errors: null,
                loading: false,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: { ...payload }
            };
        default:
            return state;
    }
};
