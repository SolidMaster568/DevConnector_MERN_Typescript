import {
  ClientErrorType,
  GithubRepoType,
  ProfileType,
} from "../../global.types";
import { AppActionTypes } from "../actions/action.types";

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
};

const profileReducer = (
  state: ProfileState = initialState,
  action: AppActionTypes
): ProfileState => {
  switch (action.type) {
    case "GET_PROFILE":
    case "UPDATE_PROFILE":
    case "GET_PROFILE_BY_ID":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case "GET_ALL_PROFILES":
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case "PROFILE_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };

    case "CLEAR_PROFILES":
      return {
        ...state,
        profiles: [],
        loading: false,
      };

    case "UPDATE_PROFILE_FAILED":
      return {
        ...state,
        loading: false,
      };

    case "DELETE_ACCOUT":
      return {
        ...initialState,
        loading: false,
      };

    case "GET_GITHUB_REPOS":
      return {
        ...state,
        loading: false,
        repos: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;

export interface ProfileState {
  profile: ProfileType | null;
  profiles: ProfileType[];
  repos: GithubRepoType[];
  loading: boolean;
  error: ClientErrorType | {};
}
