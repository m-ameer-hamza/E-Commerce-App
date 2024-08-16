const initialStateLoginUser = {
  name: "Ameer Hamza",
  email: "dummy@gmail.com",
  userAddresses: [],
};

// REDUCER FOR USER LOGIN (USER WHO IS NOT CURRENTLY LOGGED IN)
export default function userSlice(state = initialStateLoginUser, action) {
  switch (action.type) {
    case "user/saveUser":
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
      };

    case "user/logout":
      return {
        ...initialStateLoginUser,
      };
    case "user/editUserName":
      return {
        ...state,
        name: action.payload.name,
      };

    case "address/saveAddress":
      return {
        ...state,
        userAddresses: [action.payload.address], // Overwrite the existing object
      };

    default:
      return state;
  }
}

// ACTION CREATOR
export function saveUser(email, name) {
  return {
    type: "user/saveUser",
    payload: {
      email: email,
      name: name,
    },
  };
}
export function editUserName(name) {
  return {
    type: "user/editUserName",
    payload: {
      name: name,
    },
  };
}

export function saveAddress(address) {
  return {
    type: "address/saveAddress",
    payload: {
      address: address,
    },
  };
}

export function logoutUser() {
  return {
    type: "user/logout",
  };
}
