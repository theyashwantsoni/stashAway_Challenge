import { ADD_USER, User, UserActionTypes } from "../types";

const initialState: User = {
  username: "",
  password: "",
  email: "",
  city: ""
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): User {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
