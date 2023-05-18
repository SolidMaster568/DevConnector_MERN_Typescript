import axiosInstance from "../../axios.config";
import {
  DeleteAccountType,
  GetAllProfilesType,
  SetAlertType,
  UpdateProfileFailedType,
  UpdateProfileType,
  GetProfileType,
  ProfileErrorType,
  GetProfileByIdType,
  GetGithubReposType,
} from "./action.types";
import { Dispatch } from "redux";
import { GithubRepoType, ProfileType } from "../../global.types";
import alertError from "../../utils/redux-alert-errors";

export const getCurrentUserProfile = () => async (
  dispatch: Dispatch<GetProfileType | ProfileErrorType>
) => {
  try {
    const response = await axiosInstance.get<ProfileType>("/api/profile/me");
    dispatch({
      type: "GET_PROFILE",
      payload: response.data,
    } as GetProfileType);
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
      },
    } as ProfileErrorType);
  }
};

export const getAllProfiles = () => async (
  dispatch: Dispatch<GetAllProfilesType | ProfileErrorType>
) => {
  try {
    const response = await axiosInstance.get<ProfileType[]>("/api/profile/all");
    dispatch({
      type: "GET_ALL_PROFILES",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
      },
    });
  }
};

export const getProfileById = (userId: string) => async (
  dispatch: Dispatch<GetProfileByIdType | ProfileErrorType>
) => {
  try {
    const response = await axiosInstance.get<ProfileType>(
      `/api/profile/${userId}`
    );
    dispatch({
      type: "GET_PROFILE_BY_ID",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
      },
    });
  }
};

export const createOrUpdateProfile = (data: ProfileType) => async (
  dispatch: Dispatch<UpdateProfileType | UpdateProfileFailedType | SetAlertType>
) => {
  try {
    const result = await axiosInstance.post<ProfileType>("/api/profile", data);
    const { user, ...profileData } = result.data;
    dispatch({
      type: "UPDATE_PROFILE",
      payload: profileData,
    });
  } catch (error) {
    alertError(error);
    dispatch({
      type: "UPDATE_PROFILE_FAILED",
    });
  }
};

export const deleteAccount = () => async (
  dispatch: Dispatch<DeleteAccountType>
) => {
  try {
    await axiosInstance.delete("/api/user/delete");
    dispatch({ type: "DELETE_ACCOUT" });
  } catch (error) {
    alertError(error);
  }
};

export const getGithubRepos = (githubUsername: string) => async (
  dispatch: Dispatch<GetGithubReposType | ProfileErrorType>
) => {
  try {
    const response = await axiosInstance.get<GithubRepoType[]>(
      `/api/profile/github/${githubUsername}`
    );
    dispatch({
      type: "GET_GITHUB_REPOS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
      },
    });
  }
};
