

export const exceptCurrentUser = (state) => {
    let users = [];
    let currentUserId = state.session.id;
    Object.values(state.entities.users).forEach((user) => {
        if(user.id !== currentUserId) {
            users.push(user);
        }
    });
    return users;
};