export const isAuthenticated = () => {
    const expire_at = localStorage.getItem('expire_at');
    const logout = localStorage.getItem('logout');
    const now = new Date();

    if (logout === true) {
        return false
    } else if (expire_at && now < expire_at) {
        return true;
    } else {
        localStorage.setItem('expired', true);
        return false;
    }
};