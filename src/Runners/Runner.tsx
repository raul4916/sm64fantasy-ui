import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {ContentRow} from "../content/ContentRow";
import {RunnerPersonalBest} from "../draft/redux/DraftReducer";
import {RunnerGeneralInfo, RunnerInfo} from "./RunnerGeneralInfo";
import {RunnerStat, RunnerStatistics, RunnerStats} from "./RunnerStatistics";
import {RunnerStatsCharts} from "./RunnerStatsCharts";


export const Runner = (props: any) => {

    useEffect(() => {
        axios.get('https://backend.sm64fantasy.com/api/runner?name=' + props.runnerName).then((response: AxiosResponse) => {
            const runner = response.data

            const runnerPersonalBest: RunnerPersonalBest = runner.runner_personal_best
            const runnerStats = runner.runner_stat
            const runnerFullStats = {
                runnerStats: runnerStats,
                personalBest: runnerPersonalBest
            }

            const runnerInfo = {
                runnerInfo: {
                    runnerName: props.runnerName,
                    twitch_link: runner.twitch_link
                }
            }

            setRunnerInfo(runnerInfo)

            setRunnerStats(runnerFullStats)
        }).catch((error) => {

        });
    }, [])

    const initialRunnerStatState = {
        runnerStats: [],
        personalBest: {
            pb16: '0',
            pb70: '0',
            pb120: '0',
        }
    }
    const intialRunnerInfo = {runnerInfo: {}}

    const [runnerStats, setRunnerStats]: [RunnerStats, any] = useState(initialRunnerStatState)
    const [runnerInfo, setRunnerInfo]: [RunnerInfo, any] = useState(intialRunnerInfo)


    return (
        <div className={'dark-content-bg'}>
            <ContentRow components={[<RunnerGeneralInfo runnerInfo={runnerInfo.runnerInfo}/>]}
                        title={''}/>
            <ContentRow components={[<RunnerStatistics runnerStats={runnerStats}/>]} title={"Personal Best"}/>


            <ContentRow components={[<RunnerStatsCharts personalBest={runnerStats.personalBest}
                                                        runnerStats={runnerStats.runnerStats}/>]}
                        title={"Charts"}/>

        </div>
    )
}