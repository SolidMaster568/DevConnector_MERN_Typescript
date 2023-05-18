import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppActionTypes } from "./actions/action.types";

import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import alertsReducer from "./reducers/alerts";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import postsReducer from "./reducers/posts";

export const history = createBrowserHistory();

const middleware = [
  thunk as ThunkMiddleware<AppState, AppActionTypes>,
  routerMiddleware(history),
];

const enhanceCompose = composeWithDevTools({ shouldCatchErrors: true });

const rootReducer = combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  router: connectRouter(history),
});

const store: Store<AppState, any> = createStore(
  rootReducer,
  enhanceCompose(applyMiddleware(...middleware))
);

export default store;
export type AppState = ReturnType<typeof rootReducer>;
