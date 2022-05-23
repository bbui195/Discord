import { RECEIVE_PUBLIC_SERVERS, RECEIVE_SERVER, RECEIVE_SERVERS, REMOVE_SERVER } from "../../actions/server_actions";



const serversReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_SERVER:
            return Object.assign({}, state, {[action.server.id]: action.server})
        case RECEIVE_SERVERS:
            return Object.assign({}, action.servers);
            // Object.values(action.servers).forEach(server =>
            //     newState[server.id] = Object.assign(newState[server.id] || {}, server)
            // );
            // return newState;
        case RECEIVE_PUBLIC_SERVERS:
            Object.values(action.servers).forEach(server =>
                newState[server.id] = Object.assign(newState[server.id] || {}, server)
            );
            return newState;
        case REMOVE_SERVER:
            delete newState[action.serverId];
            return newState;
        default:
            return state;
    }
};

export default serversReducer;