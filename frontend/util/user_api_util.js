
export const getUsers = () => {
    return $.ajax({
        url: "api/users",
        method: "GET"
    });
};