import * as UserApiUtil from "../util/user_api_util";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users  
    };
};

export const getUsers = () => dispatch => {
    return UserApiUtil.getUsers()
        .then((users) => dispatch(receiveUsers(users)));
};