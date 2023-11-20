export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const removeItemsFromLocalStorage = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('partnerId')
    localStorage.removeItem('fullName')
    localStorage.removeItem('email')
    localStorage.removeItem('identityId')
    localStorage.removeItem('accessToken')
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}