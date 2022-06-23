import * as UserApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";
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

export const updateUser = (user) => dispatch => {
    return UserApiUtil.updateUser(user)
        .then((user) => dispatch(receiveCurrentUser(user)));
}