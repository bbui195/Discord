import { RECEIVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";


const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {[action.user.id]: action.user});
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, action.channel.users);
        default:
            return state;
    }
};

export default usersReducer;