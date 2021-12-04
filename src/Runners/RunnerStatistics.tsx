import {ContentRow} from "../content/ContentRow";
import {RunnerPersonalBest} from "../draft/redux/DraftReducer";
import {RunnerStatsCharts} from "./RunnerStatsCharts"
import {RunnerPesonalBestTable} from "./RunnerPesonalBestTable"

export type RunnerStats = {
    runnerStats: RunnerStat[]
    personalBest: RunnerPersonalBest
    points: RunnerPersonalBest
}

export type RunnerStat = {
    type: string
    time: string
    date_added: string
}


export const RunnerStatistics = (props: { runnerStats: RunnerStats }) => {
    return (
        <RunnerPesonalBestTable
            runnerPersonalBest={props.runnerStats.personalBest}
            runnerPoints={props.runnerStats.points}
        />
    )
}