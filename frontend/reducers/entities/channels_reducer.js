import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";



const channelsReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_SERVER:
            let newerState = {};
            Object.keys(action.server.channels).forEach(id => {
                newerState[id] = Object.assign(newState[id] || {}, action.server.channels[id]);
            });
            // return Object.assign({}, action.server.channels);
            return newerState;
        case RECEIVE_CHANNEL: //messages 
            let channel = Object.assign({}, action.channel);
            delete channel["messages"];
            // delete channel["users"];
            Object.assign(newState, {[channel.id]: channel});
            return newState;
        case REMOVE_CHANNEL:
            delete newState[action.channelId];
            return newState;
        default:
            return state;
    }
};

export default channelsReducer;