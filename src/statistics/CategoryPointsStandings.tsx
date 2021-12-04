import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React, {ReactElement, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios, {AxiosResponse} from "axios";
import {Runner, RunnerPersonalBest} from "../draft/redux/DraftReducer";
import {RunnerStats} from "../Runners/RunnerStatistics";
import {RunnerInfo} from "../Runners/RunnerGeneralInfo";
import {DataGrid, GridRowData} from "@mui/x-data-grid";


type RunnerStandingsInfo = {
    runnerStats: RunnerStats,
    runnerSpeedrunName: string
}

type RunnerGridData = {
    id: number
    runnerSpeedrunName: string,
    totalPoints:number,
    pb16: number,
    pb70: number,
    pb120: number,
}
const useStyles = makeStyles({
    table: {
        backgroundColor: '#16181D',
        width: '50rem',

    },
    container: {
        minHeight: '50rem',
        backgroundColor: '#16181D',
        borderColor: '#16181D',
        color: 'white',
        width: '50rem',

    },
    cell: {}
});


export const CategoryPointStandings = () => {
    const [dataGrid, setDataGrid]: [ReactElement, any] = useState(<div/>)

    useEffect(() => {
        axios.get('https://backend.sm64fantasy.com/api/runner').then((response: AxiosResponse) => {
            const runners = response.data
            const prepRunnerStats: RunnerGridData[] = []
            let i = 0;

            runners.forEach((runnerStandingsInfo: Runner) => {
                const runnerPersonalBest: RunnerPersonalBest = runnerStandingsInfo.runner_personal_best
                const runnerStats = runnerStandingsInfo.runner_stat

                const totalPoints = parseInt(runnerStandingsInfo.points.pb16) + parseInt(runnerStandingsInfo.points.pb70) + parseInt(runnerStandingsInfo.points.pb120)
                const runnerFullStats = {
                    runnerStats: runnerStats,
                    personalBest: runnerPersonalBest,
                    points: {...runnerStandingsInfo.points, pbTotal: totalPoints}
                }
                i++;
                prepRunnerStats.push(
                    {
                        id: i,
                        runnerSpeedrunName: runnerStandingsInfo.speedrun_name,
                        totalPoints: totalPoints,
                        pb16: parseInt(runnerFullStats.points.pb16),
                        pb70:  parseInt(runnerFullStats.points.pb70),
                        pb120:  parseInt(runnerFullStats.points.pb120),

                    }
                )
            })

            prepRunnerStats.sort((a,b)=>{
                return b.totalPoints - a.totalPoints;
            })

            i = 1;
            const properIdOrder = []
            prepRunnerStats.forEach((runnerStats)=>{
                runnerStats.id= i++;
                properIdOrder.push(runnerStats)
            })

            setDataGrid(
                <DataGrid className={classes.container}
                          columns={
                              [
                                  {field: 'id', headerName: 'Rank', width: 200},
                                  {field: 'runnerSpeedrunName', headerName: 'Runner tag', width: 200},
                                  {field: 'totalPoints', headerName: 'Total Points', width: 200},
                                  {field: 'pb16', headerName: '16 Star - Points', width: 200},
                                  {field: 'pb70', headerName: '70 Star - Points', width: 200},
                                  {field: 'pb120', headerName: '120 Star - Points', width: 200},
                              ]
                          }
                          rows={prepRunnerStats}/>
            );
        }).catch((error) => {

        });
    }, [])

    const classes = useStyles();

    return  <div className={'draft-window'}>
        {
            dataGrid
        }

    </div>


}