// Auth service
const authService = () => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('jwt');

    // Return true if access token exists
    if (token !== null) {
        return true;
    }

    // Return false if access token doesn't exist
    return false;
}

export default authService;