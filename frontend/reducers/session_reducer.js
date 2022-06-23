import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";


const sessionReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {id: action.user.id, username: action.user.username})
        case LOGOUT_CURRENT_USER:
            return Object.assign({}, state, {id: null, username: null})
        default:
            return state;
    }
};

export default sessionReducer;