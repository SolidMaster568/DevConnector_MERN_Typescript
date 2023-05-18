import { Dispatch } from "redux";
import {
  SetAlertType,
  LoginSuccessType,
  LoginFailType,
  LogoutType,
  ClearProfileType,
  UserNotLoadedType,
  SignupFailType,
  SignupSuccessType,
  UserLoadedType,
  AuthErrorType,
} from "./action.types";
import { LoginParamsType, SignupParams, UserType } from "../../global.types";
import alertErrors from "../../utils/redux-alert-errors";
import axiosInstance from "../../axios.config";
import { CallHistoryMethodAction, push } from "connected-react-router";

export const loadUser = () => async (
  dispatch: Dispatch<UserLoadedType | AuthErrorType | UserNotLoadedType>
) => {
  const token = localStorage.getItem("token");
  if (!token) return dispatch({ type: "USER_NOT_LOADED" });
  try {
    const response = await axiosInstance.get<UserType>("/api/auth");
    const user = response.data;

    dispatch({
      type: "USER_LOADED",
      payload: user,
    } as UserLoadedType);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_ERROR",
    } as AuthErrorType);
  }
};

export const signup = ({ name, email, password }: SignupParams) => async (
  dispatch: Dispatch<SignupSuccessType | SignupFailType | SetAlertType>
) => {
  const data = { name, email, password };

  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/api/auth/signup",
      data
    );

    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: response.data,
    } as SignupSuccessType);

    // @ts-ignore
    dispatch(loadUser());
  } catch (error) {
    alertErrors(error);

    dispatch({
      type: "SIGNUP_FAIL",
    } as SignupFailType);
  }
};

export const login = ({ email, password }: LoginParamsType) => async (
  dispatch: Dispatch<
    LoginSuccessType | LoginFailType | SetAlertType | UserLoadedType
  >
) => {
  const data = { email, password };

  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/api/auth/login",
      data
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    } as LoginSuccessType);

    // @ts-ignore
    dispatch(loadUser());
  } catch (error) {
    alertErrors(error);

    dispatch({
      type: "LOGIN_FAIL",
    } as LoginFailType);
  }
};

export const logout = () => (
  dispatch: Dispatch<LogoutType | ClearProfileType | CallHistoryMethodAction>
) => {
  localStorage.removeItem("token");
  dispatch({
    type: "CLEAR_PROFILE",
  } as ClearProfileType);
  dispatch(push("/"));
  dispatch({
    type: "LOGOUT",
  } as LogoutType);
};
