const localStorage = window.localStorage;

// Update progress points
const addPp = async (data, boundary, level) => {
    const body = {
        progressPoints: data,
        levelId: level
    }
    console.log(data, boundary, level)

    if (data / boundary * 100 >= 100) {
        // Level up (reflect in state and DB)


        // Bring in excess points to add from 0

        // Reflect new points in DB

        // Return and exit from function
    }


    const response = await fetch(
        `https://healevate2.fly.dev/api/users/progress/update`,
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

// Update progress points
const addHp = async (data) => {
    const body = {
        healthPoints: data,
    }
    console.log(data)

    if (data / 100 > 1) {
        return;
    }

    const response = await fetch(
        `https://healevate2.fly.dev/api/users/health/update`,
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


const pickMeme = (theme) => {
    const successMemes = [
        'yJFeycRK2DB4c', 'qPcX2mzk3NmjC', 'l0HTYUmU67pLWv1a8', 'B0vFTrb0ZGDf2', 'SYzDscQMN98G0LUHib'
    ]

    if (theme === 'success') {
        const randomNumber = Math.floor(Math.random() * (successMemes.length - 0) + 0);
        return successMemes[randomNumber]
    }
}













const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
}

export {
    addPp, pickMeme, addHp
}
