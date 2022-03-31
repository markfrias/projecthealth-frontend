const localStorage = window.localStorage;

// App details
const appId = "e0bb0e7f";
const appKey = "d1e12e6309c19f0a1557030bc73be338";






// Get all logs for the current user
const addPp = async (data, boundary) => {
    const body = {
        progressPoints: data
    }
    console.log(data, boundary)

    if (data / boundary * 100 >= 100) {
        // Level up (reflect in state and DB)


        // Bring in excess points to add from 0

        // Reflect new points in DB

        // Return and exit from function
    }


    const response = await fetch(
        `http://localhost:8000/api/users/progress/update`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')
            },
            body: JSON.stringify(body),
        }
    );
    const newResponse = await response.json();
    // Check if user is authorized
    if (response.status === 401) {
        // If not, trigger log out function
        logout();
    } else if (response.status === 200) {
        return newResponse;
    } else {
        return response.status;
    }
};

const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
}

export {
    addPp
}
