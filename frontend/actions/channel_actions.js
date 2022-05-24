import * as ChannelApiUtil from "../util/channel_api_util";

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

const receiveChannel = (channel) => {
    return {
        type: RECEIVE_CHANNEL,
        channel
    };
};

const removeChannel = (channelId) => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    };
};

export const getChannel = (channelId) => dispatch => {
    return ChannelApiUtil.getChannel(channelId)
        .then((channel) => dispatch(receiveChannel(channel)));
};

export const createChannel = (channel) => dispatch => {
    return ChannelApiUtil.createChannel(channel)
        .then((channel) => dispatch(receiveChannel(channel)));
};

export const updateChannel = (channel) => dispatch => {
    return ChannelApiUtil.updateChannel(channel)
        .then((channel) => dispatch(receiveChannel(channel)));
}

export const deleteChannel = (channelId) => dispatch => {
    return ChannelApiUtil.deleteChannel(channelId)
        .then(() => dispatch(removeChannel(channelId)));
};