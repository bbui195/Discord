import { RECEIVE_SESSION_ERRORS, RESET_SESSION_ERRORS } from "../actions/session_actions";


const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return Object.assign({}, state, action.errors);
        case RESET_SESSION_ERRORS:
            return {};
        default:
            return state;
    }
    return state;
};

export default sessionErrorsReducer;