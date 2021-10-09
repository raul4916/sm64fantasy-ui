import {Button} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios, {AxiosResponse} from "axios";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import Cookies from "universal-cookie";
import {State} from "../App";
import "../bootstrap-5.1.0-dist/css/bootstrap.min.css";
import "../less/main.css";
import {setDraftInfo} from "./redux/actionCreators";
import {AvailableDraftRunner, DraftRunner} from "./redux/DraftReducer";


const useStyles = makeStyles({
    table: {
        backgroundColor: '#16181D',
        // width: '45rem',
        borderColor: '#16181D',
        maxHeight: '40rem',
    },
    cell: {
        color: 'white',
        borderColor: '#16181D',
    }
});


export const DraftPickTable = () => {

    const draftState = useSelector((state: State) => state.draftReduce)
    const userState = useSelector((state: State) => state.userReduce)
    const dispatch = useDispatch();
    const draftInfo = bindActionCreators({setDraftInfo}, dispatch)
    const cookies = new Cookies();
    const updateCurrentPicks = () => {
        let config = {headers: {'Authorization': 'JWT ' + cookies.get('token')}}
        axios.put('https://backend.sm64fantasy.com/api/get-draft-info?season_id=1', draftState, config).then((value: AxiosResponse<any>) => {

                const season = value.data.season;
                // const draft = value.data.draft)[0];
                // const teams = value.data.teams;
                const available_draft_runners = value.data.available_draft_runners
                const picked_draft_runners = value.data.picked_draft_runners
                // const runners = value.data.runners


                const newDraftState = {
                    'season': season.id,
                    'draft': 1,
                    'teams': [],
                    'available_draft_runners': available_draft_runners,
                    'picked_draft_runners': picked_draft_runners,
                    'wait': 0
                }

                draftInfo.setDraftInfo(newDraftState);

            }
        ).catch((error) => {
            console.log(error)
        })

        // console.log('https://backend.sm64fantasy.com/', {capt: 'gtm', pick: row});
    }

    const uiUpdatePicks = (playerId: number, team: string) => {
        draftState.available_draft_runners.forEach((runner: DraftRunner, index: number) => {
            if (runner.id == playerId) {
                draftState.available_draft_runners.splice(index, 1)
                draftState.picked_draft_runners.push({...runner, draft_status: "picked"})
                console.log(draftState.picked_draft_runners)
                draftInfo.setDraftInfo({...draftState})
            }
        })
    }

    const submitPick = (availRunner: AvailableDraftRunner) => {
        let config = {headers: {'Authorization': 'JWT ' + cookies.get('token')}}

        uiUpdatePicks(availRunner.id, availRunner.team);

        axios.put("https://backend.sm64fantasy.com/api/draft-runners/" + availRunner.id + "/", {
            "draft_type": availRunner.draft_type,
            "draft_status": "picked",
            "description": availRunner.description,
            "order_drafted": draftState.picked_draft_runners.length,
            "runner": availRunner.runner.id,
            "draft": availRunner.draft,
        }, config).then((response) => {
            updateCurrentPicks()
        }).catch(
            (error) => {
                console.log(error)
            }
        );
    }


    useEffect(() => {
    })

    const classes = useStyles();

    const PickButtonCell = (availableDraftRunner: AvailableDraftRunner) => {
        return userState.loggedIn ?
            (<TableCell className={classes.cell}>{
                <Button variant={'contained'} color={'primary'}
                        onClick={() => {
                            submitPick(availableDraftRunner)
                        }}
                >Pick</Button>}</TableCell>) : (
                <TableCell className={classes.cell}>{
                    <Button variant={'contained'} color={'primary'} disabled
                    >Pick</Button>}</TableCell>)
    }

    return (
        <div className={'draft-window'}>
            <TableContainer className={classes.table} component={Paper}>
                <Table className={classes.table} aria-label="simple table" size={'small'}>
                    <TableHead>
                        <TableRow className={''}>
                            <TableCell className={classes.cell}>Runner Tag</TableCell>
                            <TableCell className={classes.cell}>PB - 16 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 70 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 120 Stars</TableCell>
                            <TableCell className={classes.cell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draftState.available_draft_runners.map((availableDraftRunner) => (
                            <TableRow key={availableDraftRunner.runner.speedrun_name + '_drafted'}
                                      className={''}>
                                <TableCell className={classes.cell} component="th" scope="row">
                                    {availableDraftRunner.runner.speedrun_name}
                                </TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb16}</TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb70}</TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb120}</TableCell>
                                {PickButtonCell(availableDraftRunner)}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    )
}