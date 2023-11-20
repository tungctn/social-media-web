import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  postState: postReducer,
});

export default (state: any, action: any) => rootReducer(state, action);
