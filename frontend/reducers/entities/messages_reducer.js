import { RECEIVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_MESSAGE } from "../../actions/message_actions";

const messagesReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_MESSAGE:
            let msg = action.message;
            let newState = Object.assign({}, state);
            if(msg.body === "") {
                delete newState[msg.id];
            } else {
                Object.assign(newState, {[msg.id]: msg});
            }
            return newState;
        case RECEIVE_CHANNEL:
            return Object.assign({}, action.channel.messages);
        default:
            return state;
    }
};

export default messagesReducer;