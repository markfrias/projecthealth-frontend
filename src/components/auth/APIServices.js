const localStorage = window.localStorage;

// App details
const appId = "e0bb0e7f";
const appKey = "d1e12e6309c19f0a1557030bc73be338";


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
  const newResponse = await response.json();
  // Check if user is authorized
  if (response.status === 401) {
    // If not, trigger log out function
    logout();
  } else if (response.status === 200) {
    return newResponse;
  } else {
    return newResponse;
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


  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/users/register/",
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
    return response.status;
  } else {
    return response.status;
  }

  // Add code to handle errors and display error states and messages
}

// Get synchronous (local) goals
const getGoalsSync = () => {
  const goals = [
    {
      goalId: 2,
      goalName: "Eat healthier"
    },
    {
      goalId: 3,
      goalName: "Increase physical activity"
    },
    {
      goalId: 4,
      goalName: "Lose weight"
    },
    {
      goalId: 5,
      goalName: "Gain weight"
    },
    {
      goalId: 6,
      goalName: "Maintain weight"
    },
    {
      goalId: 7,
      goalName: "Improve sleep"
    },
    {
      goalId: 8,
      goalName: "Reduce alcohol consumption"
    },
    {
      goalId: 9,
      goalName: "None"
    }

  ]

  return goals;
}

// Fetch all users ** test function
const getHabitAutocomplete = async (query) => {
  const response = await fetch(
    `https://projecthealthapp.herokuapp.com/api/habit/autocomplete?habitName=${query}`,
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
  const newResponse = await response.json();
  // Check if user is authorized
  if (response.status === 401) {
    // If not, trigger log out function
    logout();
  } else if (response.status === 200) {
    return newResponse;
  } else {
    return newResponse;
  }


};

// Creates a new habit
const createHabit = async (habitName, habitDescription, goalCategory) => {
  const body = {
    habitName: habitName,
    habitDescription: habitDescription,
    goalId: goalCategory.goalId
  };
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/habit/create/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
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
    return response;
  } else {
    return response;
  }

  // Add code to handle errors and display error states and messages
}

// Fetch all habits for a specific user
const getUserHabits = async () => {
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/habit/userhabits/",
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
  const newResponse = await response.json();
  // Check if user is authorized
  if (response.status === 401) {
    // If not, trigger log out function
    logout();
  } else if (response.status === 200) {
    return newResponse;
  } else {
    return newResponse;
  }


};

// Save user habits
const saveHabits = async (habits) => {
  const body = {
    habits: habits
  };
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/habit/save/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
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
    return response;
  } else {
    return response;
  }

  // Add code to handle errors and display error states and messages
}

// Save quick note
const saveNote = async (body) => {
  if (body.foodName === "" || body.servingDescription === "") {
    return 400;
  }
  body.diaryType = "quick";
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/food/createEntry/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
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
}

// Fetch food autocomplete suggestions
const getFoodAutocomplete = async (query) => {
  const response = await fetch(
    `https://api.edamam.com/auto-complete?app_id=${appId}&app_key=${appKey}&q=${query}`,
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

// Fetch food autocomplete suggestions
const getFoodSearchResults = async (query) => {
  const response = await fetch(
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${query}`,
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

// Fetch food autocomplete suggestions
const getNutrients = async (measureURI, foodId) => {
  const body = {
    ingredients: [
      {
        quantity: 1,
        measureURI: measureURI,
        foodId: foodId
      }
    ]
  }
  const response = await fetch(
    `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${appId}&app_key=${appKey}`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
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


// Fetch nutrients and calories consumed by signed in user within the current day
const getTodayUserNutrients = async (measureURI, foodId) => {

  const response = await fetch(
    `https://projecthealthapp.herokuapp.com/api/food/entry/day/agg`,
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

// Fetch calorie budget of signed in user
const getCalorieBudget = async () => {

  const response = await fetch(
    `https://projecthealthapp.herokuapp.com/api/users/calorieBudget`,
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

// Save quick note
const saveDetailedFoodLog = async (body) => {
  if (body.mealType === "" || body.diaryType === "" || body.foodId === "" || body.foodName === "" || body.servingUnit === "" || body.servingQty === "" || body.caloriesPerUnit === "" || body.carbs === "" || body.protein === "" || body.fat === "" || body.sodium === "" || body.weightInG === "") {
    return 400;
  }
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/food/createEntry/",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
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
}

// Fetch calorie budget of signed in user
const getNotifSettings = async () => {

  const response = await fetch(
    `https://projecthealthapp.herokuapp.com/api/notifications/get`,
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

// Save quick note
const saveWeightHeightSettings = async (body) => {
  body.targetWeight = body.goalWeight;
  if (body.weight === "" || body.height === "" || body.targetWeight === "") {
    return 400;
  }
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/users/modify-weight",
    {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(body),
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
}

// Fetch calorie budget of signed in user
const getMissions = async () => {

  const response = await fetch(
    `https://projecthealthapp.herokuapp.com/api/missions/journal/get-all`,
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

// Save mission accomplishment status changes
const saveMissionStatus = async (body) => {
  if (body.missionEntryId === "" || body.missionAccomplished === "") {
    return 400;
  }
  console.log(body)
  const response = await fetch(
    "https://projecthealthapp.herokuapp.com/api/missions/journal/update",
    {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(body),
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
}










const logout = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
}

export {
  getUsers, logout, saveNotifSchedule, registerAccount, getGoalsSync, getHabitAutocomplete, createHabit,
  getUserHabits, saveHabits, saveNote, getFoodAutocomplete, getFoodSearchResults, getNutrients, getTodayUserNutrients,
  getCalorieBudget, saveDetailedFoodLog, getNotifSettings, saveWeightHeightSettings, getMissions, saveMissionStatus
}
