import { combineReducers } from "redux";
import channelsReducer from "./entities/channels_reducer";
import serversReducer from "./entities/servers_reducer";
import usersReducer from "./entities/users_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    servers: serversReducer,
    channels: channelsReducer
});

export default entitiesReducer;