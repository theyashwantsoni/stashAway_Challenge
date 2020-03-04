export interface User{
    username : string;
    password: string;
    email: string;
    city:string;
}
export const ADD_USER = "ADD_USER"

interface AddUser{
    type: typeof ADD_USER;
    payload : User;
}

export type UserActionTypes = AddUser;
