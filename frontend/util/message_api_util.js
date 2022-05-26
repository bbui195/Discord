
export const getMessagesWith = (userId) => {
    return $.ajax({
        url: `api/messages/${userId}`,
        method: "GET"
    });
};

export const createMessage = (message) => {
    return $.ajax({
        url: `api/messages`,
        method: "POST",
        data: {message}
    });
};

export const editMessage = (message) => {
    return $.ajax({
        url: `api/messages/${message.id}`,
        method: "PATCH",
        data: {message}
    });
};

export const deleteMessage = (messageId) => {
    return $.ajax({
        url: `api/messages/${messageId}`,
        method: "DELETE"
    });
};