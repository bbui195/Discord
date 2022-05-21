import * as ServerApiUtil from "../util/server_api_util";

export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const REMOVE_SERVER = "REMOVE_SERVER";

const receiveServer = server => {
    return {
        type: RECEIVE_SERVER,
        server
    };
};

const receiveServers = servers => {
    return {
        type: RECEIVE_SERVERS,
        servers
    };
};

const removeServer = serverId => {
    return {
        type: REMOVE_SERVER,
        serverId
    }
}

export const createServer = server => dispatch => {
    return ServerApiUtil.createServer(server)
        .then(server => dispatch(receiveServer(server)));
};

export const fetchServers = () => dispatch => {
    return ServerApiUtil.getServers()
        .then(servers => dispatch(receiveServers(servers)));
};

export const fetchServer = serverId => dispatch => {
    return ServerApiUtil.getServer(serverId)
        .then(server => dispatch(receiveServer(server)));
};

export const deleteServer = serverId => dispatch => {
    return ServerApiUtil.deleteServer(serverId)
        .then(() => dispatch(removeServer(serverId)));
};

export const updateServer = server => dispatch  => {
    return ServerApiUtil.updateServer(server)
        .then((server) => dispatch(receiveServer(server)));
};