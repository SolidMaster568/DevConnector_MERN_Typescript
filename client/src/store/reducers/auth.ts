import { AppActionTypes } from "../actions/action.types";
import { UserType } from "../../global.types";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authReducer = (
  state: AuthState = initialState,
  action: AppActionTypes
): AuthState => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case "USER_NOT_LOADED":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      const token = action.payload.token;
      localStorage.setItem("token", token);
      return {
        ...state,
        token,
        loading: false,
      };

    case "SIGNUP_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
    case "DELETE_ACCOUT":
      localStorage.removeItem("token");
      return {
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserType | null;
  loading: boolean;
}
