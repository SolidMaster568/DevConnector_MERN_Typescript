import { CallHistoryMethodAction } from "connected-react-router";
import {
  AlertType,
  ClientErrorType,
  CommentType,
  GithubRepoType,
  PostType,
  ProfileType,
  UserType,
} from "../../global.types";

export interface SetAlertType {
  type: "SET_ALERT";
  payload: AlertType;
}
export interface RemoveAlertType {
  type: "REMOVE_ALERT";
  payload: {
    id: string;
  };
}
export interface clearAlertsType {
  type: "CLEAR_ALERTS";
}
export interface SignupSuccessType {
  type: "SIGNUP_SUCCESS";
  payload: {
    token: string;
  };
}
export interface SignupFailType {
  type: "SIGNUP_FAIL";
}
export interface UserLoadedType {
  type: "USER_LOADED";
  payload: UserType;
}
export interface UserNotLoadedType {
  type: "USER_NOT_LOADED";
}
export interface AuthErrorType {
  type: "AUTH_ERROR";
}
export interface LoginSuccessType {
  type: "LOGIN_SUCCESS";
  payload: {
    token: string;
  };
}
export interface LoginFailType {
  type: "LOGIN_FAIL";
}
export interface LogoutType {
  type: "LOGOUT";
}
export interface GetProfileType {
  type: "GET_PROFILE";
  payload: ProfileType;
}
export interface GetProfileByIdType {
  type: "GET_PROFILE_BY_ID";
  payload: ProfileType;
}
export interface GetAllProfilesType {
  type: "GET_ALL_PROFILES";
  payload: ProfileType[];
}
export interface ProfileErrorType {
  type: "PROFILE_ERROR";
  payload: ClientErrorType;
}
export interface ClearProfileType {
  type: "CLEAR_PROFILE";
}
export interface ClearProfilesType {
  type: "CLEAR_PROFILES";
}
export interface UpdateProfileType {
  type: "UPDATE_PROFILE";
  payload: ProfileType;
}
export interface UpdateProfileFailedType {
  type: "UPDATE_PROFILE_FAILED";
}
export interface DeleteAccountType {
  type: "DELETE_ACCOUT";
}
export interface GetGithubReposType {
  type: "GET_GITHUB_REPOS";
  payload: GithubRepoType[];
}
export interface GetPostsType {
  type: "GET_POSTS";
  payload: PostType[];
}
export interface GetPostType {
  type: "GET_POST";
  payload: PostType;
}
export interface ClearPostType {
  type: "CLEAR_POST";
}
export interface PostErrorType {
  type: "POST_ERROR";
  payload: ClientErrorType;
}
export interface UpdateLikesType {
  type: "UPDATE_LIKES";
  payload: {
    likes: string[];
    postId: string;
  };
}
export interface DeletePostType {
  type: "DELETE_POST";
  payload: string;
}
export interface AddPostType {
  type: "ADD_POST";
  payload: PostType;
}
export interface AddCommentType {
  type: "ADD_COMMENT";
  payload: CommentType[];
}
export interface DeleteCommentType {
  type: "DELETE_COMMENT";
  payload: string; //commentId
}

export type AppActionTypes =
  | CallHistoryMethodAction //for router bindings
  | SetAlertType
  | RemoveAlertType
  | clearAlertsType
  | SignupSuccessType
  | SignupFailType
  | UserLoadedType
  | UserNotLoadedType
  | AuthErrorType
  | LoginSuccessType
  | LoginFailType
  | LogoutType
  | GetProfileType
  | GetProfileByIdType
  | GetAllProfilesType
  | ProfileErrorType
  | ClearProfileType
  | ClearProfilesType
  | UpdateProfileType
  | UpdateProfileFailedType
  | DeleteAccountType
  | GetGithubReposType
  | GetPostsType
  | GetPostType
  | ClearPostType
  | PostErrorType
  | UpdateLikesType
  | DeletePostType
  | AddPostType
  | AddCommentType
  | DeleteCommentType;
