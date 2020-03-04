import { User, ADD_USER } from "../types";

export function addUser(newUser: User) {
  return {
    type: ADD_USER,
    payload: newUser
  };
}
