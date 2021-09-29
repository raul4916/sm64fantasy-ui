import {Dispatch} from "redux";
import {UserState} from "./UserReducer";


export const loginUser = (userState: UserState,) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: 'LOGIN_USER',
            userState: userState,
        })
    }
}