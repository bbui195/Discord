

export const serversIn = (state) => {
    let serversIn = [];
    Object.values(state.entities.servers).forEach((server) => {
        if(server.in !== false) {
            serversIn.push(server);
        }
    });
    return serversIn;
}

export const serversNotIn = (state) => {
    let notIn = [];
    Object.values(state.entities.servers).forEach((server) => {
        if(server.in === false) {
            notIn.push(server);
        }
    });
    return notIn;
}