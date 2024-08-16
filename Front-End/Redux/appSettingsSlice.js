const initialAppSettings = {
  theme: "dark",
  fontSize: "medium",
};

export default function appSettingsSlice(state = initialAppSettings, action) {
  switch (action.type) {
    case "appSettings/editTheme":
      return {
        ...state,
        theme: action.payload ? "light" : "dark",
      };
    case "appSettings/editFontSize":
      return {
        ...state,
        fontSize: action.payload.fontSize,
      };
    case "appSettings/logout":
      return {
        ...state,
        theme: "dark",
      };
    default:
      return state;
  }
}

export function editTheme(isWhite) {
  return {
    type: "appSettings/editTheme",
    payload: isWhite,
  };
}

export function editFontSize(fontSize) {
  return {
    type: "appSettings/editFontSize",
    payload: {
      fontSize: fontSize,
    },
  };
}

//action handler to clear the user data
export function logoutAppSettings() {
  return {
    type: "appSettings/logout",
  };
}
