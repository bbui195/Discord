
export const getUsers = () => {
    return $.ajax({
        url: "api/users",
        method: "GET"
    });
};

export const updateUser = (user) => {
    return $.ajax({
        url: `api/users/123`,
        method: "PATCH",
        data: {
            user
        }
    })
}