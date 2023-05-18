import { v4 as uuid } from "uuid";

import { SetAlertType, RemoveAlertType } from "./action.types";

export const setAlert = (msg: string, alertType: string): SetAlertType => ({
  type: "SET_ALERT",
  payload: {
    id: uuid(),
    msg,
    alertType,
  },
});

export const removeAlert = (id: string): RemoveAlertType => ({
  type: "REMOVE_ALERT",
  payload: { id },
});
