import { createStore, combineReducers } from "redux";

import userReducer from "./userSlice";
import sessionReducer from "./sessionSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

// import dropDownReducer from "./MenuListSlice";
// import settingsReducer from "./AppSettingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  auth: authReducer,
  cart: cartReducer,

  // menu: dropDownReducer,
  // settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
