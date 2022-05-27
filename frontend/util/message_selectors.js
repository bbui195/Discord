

export const messagesFor = (state, type, id) => {
    if(!id) {
        return [];
    }
    let messages = [];
    id = parseInt(id);
    Object.values(state.entities.messages).forEach((message) => {
        if(message.type === type
                && (message.typeId === id || message.senderId === id)) {
            let time = new Date(message.time);
            messages.push(Object.assign(message,
                {username: state.entities.users[message.senderId].username},
                {time: time.toLocaleDateString(undefined, {day: "2-digit", month: "2-digit", year: "numeric"})}));
        }
    });
    return messages;
};