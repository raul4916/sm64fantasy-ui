import {AnyAction, configureStore, Reducer} from '@reduxjs/toolkit'

const initialState: DraftState = {
        'season': 1,
        'draft': 1,
        //     id: 0,
        //     current_picker: 0,
        //     current_time: '0',
        //     description: '',
        //     season: 1,
        //     type: ''
        // },
        // 'teams': [],
        'available_draft_runners': [],
        'picked_draft_runners': [],
    }
;

export type Draft = {
    id: number
    current_picker: number
    current_time: string
    description: string
    season: 1
    type: string
}

export type Runner = {
    id: number
    "type": string,
    "description": string,
    "discord_name": string,
    "speedrun_link": string,
    "speedrun_name": string,
    "speedrun_api_link": string
    runner_stat: RunnerStat
}

export type RunnerStat = {
    pb16: string
    pb70: string
    pb120: string
}

export interface AvailableDraftRunner {
    id: number
    description: string
    draft: number
    draft_status: "available"
    draft_type: string
    order_drafted: number
    runner: Runner
    runner_stat: RunnerStat
    team: string
}

export interface PickedDraftRunner {
    id: number
    description: string
    draft: number
    draft_status: "picked"
    draft_type: string
    order_drafted: number
    runner: Runner
    team: string
}

const a = {
    "season_dict": {"id": 1, "type": "1", "description": "1"},
    "available_draft_runners": [{
        "id": 1,
        "draft_type": "fantasy",
        "draft_status": "available",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }, {
        "id": 2,
        "draft_type": "fantasy",
        "draft_status": "available",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }, {
        "id": 3,
        "draft_type": "fantasy",
        "draft_status": "available",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }, {
        "id": 4,
        "draft_type": "fantasy",
        "draft_status": "available",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }, {
        "id": 5,
        "draft_type": "fantasy",
        "draft_status": "available",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }],
    "picked_draft_runners": [{
        "id": 6,
        "draft_type": "fantasy",
        "draft_status": "picked",
        "description": "This field is required.",
        "draft": 1,
        "order_drafted": 0,
        "team": null,
        "runner": {
            "id": 1,
            "type": "fantasy",
            "description": "GTM",
            "discord_name": "__GTM",
            "twitch_link": null,
            "speedrun_name": "ringo792",
            "speedrun_link": "This field is required.",
            "speedrun_api_link": null
        }
    }]
}
export type DraftRunner = AvailableDraftRunner | PickedDraftRunner

export type AvailableDraftRunners = AvailableDraftRunner[]

export type PickedDraftRunners = PickedDraftRunner[]

export type Team = {
    roster: DraftRunner[]
    name: string
    id: number
}
export type Teams = Team[]

export type DraftState = {
    'season': number,
    'draft': number,
    'available_draft_runners': AvailableDraftRunners,
    'picked_draft_runners': PickedDraftRunners,
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