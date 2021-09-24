import {AnyAction, configureStore, Reducer} from '@reduxjs/toolkit'

const initialState = {
    'season': 1,
    'draft': 2,
    'teams': 3,
    'available_draft_runners': 4,
    'picked_draft_runners': 5,
};

type Draft = {
    id: number
    current_picker: number
    current_time: string
    description: string
    season: 1
    type: string
}

type Runner = {
    id: number
    "type": string,
    "description": string,
    "discord_name": string,
    "speedrun_link": string,
    "speedrun_name": string
}

type RunnerStat = {
    pb16: string
    pb70: string
    pb120: string
}

interface AvailableDraftRunner {
    description: string
    draft: number
    draft_status: "available"
    draft_type: string
    order_drafted: number
    runnerId: Runner
    runnerStat: RunnerStat
    team: number
}

interface PickedDraftRunner {
    description: string
    draft: number
    draft_status: "picked"
    draft_type: string
    order_drafted: number
    runnerId: Runner
    team: number
}

type DraftRunner = AvailableDraftRunner | PickedDraftRunner


type AvailableDraftRunners = {
    runners: AvailableDraftRunner[]
}

type PickedDraftRunners = {
    runners: PickedDraftRunner[]
}


export type DraftState = {
    'season': number,
    'draft': number,
    'teams': number,
    'available_draft_runners': number,
    'picked_draft_runners': number,
}
type Action = {
    type: string;
    draftState: DraftState
}


export const DraftReducer = (state: DraftState = initialState, action: Action): DraftState => {
    switch (action.type) {
        case 'UPDATE_DRAFT_INFO':
            return action.draftState;
        case 'GET_DRAFT_INFO':
            return state;
        default:
            return state;
    }
}