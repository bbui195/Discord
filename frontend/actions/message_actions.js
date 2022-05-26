import * as MessageApiUtil from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

export const createMessage = message => dispatch => {
    return MessageApiUtil.createMessage(message);
};

export const updateMessage = message => dispatch => {
    return MessageApiUtil.editMessage(message);
};

export const deleteMessage = messageId => dispatch => {
    return MessageApiUtil.deleteMessage(messageId);
};