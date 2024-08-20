const initialStateSession = {
  isAuthenticated: false, // Corrected property name for consistency
};

// Action types
const TOGGLE_AUTH = "auth/toggleAuth";
const LOGOUT = "auth/logout";

// REDUCER FOR USER LOGIN (USER WHO IS NOT CURRENTLY LOGGED IN)
export default function authSlice(state = initialStateSession, action) {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated, // Toggle the isAuthenticated state
      };

    case LOGOUT:
      return {
        ...initialStateSession,
      };

    default:
      return state;
  }
}

// ACTION CREATORS
export function toggleAuth() {
  return {
    type: TOGGLE_AUTH,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
