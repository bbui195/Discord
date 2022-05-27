import * as MessageApiUtil from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    };
};

export const getMessagesWith = userId => dispatch => {
    return MessageApiUtil.getMessagesWith(userId)
        .then((messages) => dispatch(receiveMessages(messages)));
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