import { ClientErrorType, PostType } from "../../global.types";
import { AppActionTypes } from "../actions/action.types";

const initialState: PostsState = {
  post: undefined,
  posts: [],
  loading: true,
  error: {},
};

const postsReducer = (
  state: PostsState = initialState,
  action: AppActionTypes
): PostsState => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, loading: false, posts: action.payload };

    case "GET_POST":
      return { ...state, loading: false, post: action.payload };

    case "UPDATE_LIKES":
      const postsAfterLike: PostType[] = state.posts.map(post =>
        post._id === action.payload.postId
          ? { ...post, likes: action.payload.likes }
          : post
      );
      return { ...state, loading: false, posts: postsAfterLike };

    case "DELETE_POST":
      const postsAfterDelete: PostType[] = state.posts.filter(
        post => post._id !== action.payload
      );
      return { ...state, loading: false, posts: postsAfterDelete };

    case "CLEAR_POST":
      return { ...state, loading: false, post: undefined };

    case "ADD_POST":
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };

    case "ADD_COMMENT":
      return {
        ...state,
        loading: false,
        post: {
          ...state.post!,
          comments: action.payload,
        },
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        loading: false,
        post: {
          ...state.post!,
          comments: state.post!.comments.filter(
            comment => comment._id !== action.payload
          ),
        },
      };

    case "POST_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default postsReducer;

export interface PostsState {
  post?: PostType;
  posts: PostType[];
  loading: boolean;
  error: ClientErrorType | {};
}
