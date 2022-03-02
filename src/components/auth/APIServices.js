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
    return response.status;
  } else {
    return response.status;
  }


};

// Subscribe and save notification schedule
// Array parameter refers to the array of three string schedules to subscribe and save
const saveNotifSchedule = async (array, registrationToken) => {
  // Enable spinner
  //setIsLoading(true);
  const reqBody = {
    breakfastTime: array[0],
    lunchTime: array[1],
    dinnerTime: array[2],
    registrationToken: registrationToken
  }
  console.log(reqBody)

  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/notifications/subscribe/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('jwt')

      },

    }
  );

  // Check if user is authorized
  if (response.status === 401) {
    // If not, trigger log out function
    logout();
  } else if (response.status === 200) {
    return response.status;
  } else {
    return response.status;
  }

  // Add code to handle errors and display error states and messages

};

// Registration handler
const registerAccount = async (form) => {

  // Put goals in an array
  const goals = [];
  for (const key in form.goals) {
    if (form.goals[key] === true) {
      goals.push(key);
    }
  }
  goals.push(form.goals.weightGoal);

  const revisedForm = {
    ...form,
    goals: goals,
    dateOfBirth: form.birthday,
    passcode: form.password1
  }

  console.log(revisedForm)

  const response = await fetch(
    "http://localhost:8000/api/users/register/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(revisedForm),
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('jwt')

      },

    }
  );

  // Check if user is authorized
  if (response.status === 401) {
    // If not, trigger log out function
    logout();
  } else if (response.status === 200) {
    console.log(response.status)
    return response.status;
  } else {
    console.log(response.status)
    return response.status;
  }

  // Add code to handle errors and display error states and messages
}

const logout = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
}

export {
  getUsers, logout, saveNotifSchedule, registerAccount
}
