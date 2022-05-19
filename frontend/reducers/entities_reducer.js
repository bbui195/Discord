import { combineReducers } from "redux";
import serversReducer from "./entities/servers_reducer";
import usersReducer from "./entities/users_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    servers: serversReducer
});

export default entitiesReducer;