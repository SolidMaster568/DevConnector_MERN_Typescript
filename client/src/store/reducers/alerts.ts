import { AppActionTypes } from "../actions/action.types";
import { AlertType } from "../../global.types";

const initialState: AlertType[] = [];

const alertsReducer = (
  state: AlertType[] = initialState,
  action: AppActionTypes
) => {
  switch (action.type) {
    case "SET_ALERT":
      return [...state, action.payload];
    case "REMOVE_ALERT":
      return state.filter((alert: AlertType) => alert.id !== action.payload.id);
    case "CLEAR_ALERTS":
      return [];
    default:
      return state;
  }
};

export default alertsReducer;
