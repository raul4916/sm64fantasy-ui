import {AnyAction, configureStore, Reducer} from '@reduxjs/toolkit'

const initialState: UserState = {
        role: '',
        username: '',
        loggedIn: false,
        isStaff: false
    }
;

export type UserState = {
    role: string
    username: string
    loggedIn: boolean
    isStaff: boolean
}

type Action = {
    type: string;
    userState: UserState
}


export const UserReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.userState;
        default:
            return state;
    }
}