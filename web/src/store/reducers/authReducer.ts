import { CHECK_LOGED_IN, LOG_IN, LOG_OUT } from "../constants/authTypes";

const initialAuthState = {};

export default function authReducer(state = initialAuthState, action: any) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogedIn: action.success,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogedIn: false,
      };
    case CHECK_LOGED_IN:
      console.log({
        ...state,
        isLogedIn: Boolean(action.userInfo),
        user: action.userInfo,
      });

      return {
        ...state,
        isLogedIn: Boolean(action.userInfo),
        user: action.userInfo,
      };
    default:
      return state;
  }
}
