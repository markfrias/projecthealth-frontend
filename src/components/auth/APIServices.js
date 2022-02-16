const localStorage = window.localStorage;


// API call handlers



// Fetch all users ** test function
const getUsers = async () => {
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/users/",
    {
      method: "GET",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }  
    }
  );
    // Check if user is authorized
    if (response.status === 401) {
        // If not, trigger log out function
        logout();
    } else if (response.status === 200) {
        const data = await response.json();
        return data;
    }

    
};

const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
}

module.exports = {
    getUsers, logout
}
