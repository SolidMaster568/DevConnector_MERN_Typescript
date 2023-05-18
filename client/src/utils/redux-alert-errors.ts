import { ServerErrorType } from "../global.types";
import { v4 as uuid } from "uuid";
import store from "../store/configureStore";
import { SetAlertType } from "../store/actions/action.types";

const alertError = (error: any) => {
  const errorResponse: { errors: ServerErrorType[] } = error?.response?.data;

  errorResponse?.errors?.forEach((err: ServerErrorType) => {
    store.dispatch({
      type: "SET_ALERT",
      payload: {
        id: uuid(),
        alertType: "danger",
        msg: err.msg,
      },
    } as SetAlertType);
  });
};

export default alertError;
