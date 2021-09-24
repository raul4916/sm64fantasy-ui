import {Dispatch} from "redux";
import {DraftState} from "./DraftReducer";

export const setDraftInfo = (draftState: DraftState) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: 'UPDATE_DRAFT_INFO',
            draftState: draftState
        })
    }
}

export const getDraftInfo = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: 'GET_DRAFT_INFO',
        })
    }
}