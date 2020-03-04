import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { addUser } from "./userDomain/actions";
import { AppState } from "./store";

export const thunkAddUser = (
  username: string,
  password: string,
  email: string,
  city: string,
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
//   const asyncResp = await exampleAPI();
  dispatch(
    addUser({
      username,
      password,
      email,
      city
    })
  );
};

function exampleAPI() {
  return Promise.resolve("Async Chat Bot");
}
