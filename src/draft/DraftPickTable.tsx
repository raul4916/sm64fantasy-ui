import "../less/main.css";
import "../bootstrap-5.1.0-dist/css/bootstrap.min.css";
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {DraftStates} from "../MainLayout/MainWindow";
import axios, {AxiosResponse} from "axios";
import {AvailableDraftRunner} from "./redux/DraftReducer";
import {bindActionCreators} from "redux";
import {setDraftInfo} from "./redux/actionCreators";


const useStyles = makeStyles({
    table: {
        backgroundColor: '#16181D',
        width: '50rem',
        borderColor: '#16181D',
    },
    container: {
        maxHeight: 440,
        backgroundColor: '#16181D',
        borderColor: '#16181D',

    },
    cell: {
        color: 'white',
        borderColor: '#16181D',
    }
});


export const DraftPickTable = () => {

    const draftState = useSelector((state: DraftStates) => state.draftReduce)
    const dispatch = useDispatch();
    const draftInfo = bindActionCreators({setDraftInfo}, dispatch)

    const getCurrentPicks = () => {
        let config = {headers: {'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjMyOTI0MDcyLCJlbWFpbCI6ImFAYi5jb20iLCJvcmlnX2lhdCI6MTYzMjQ5MjA3Mn0.K3pMT_nA96x76sAseMjh3L3fb9Js_AgsrERDp0eRbNQ'}}
        axios.get('http://localhost:8000/api/get-draft-info?season_id=1', config).then((value: AxiosResponse<any>) => {

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
                }

                draftInfo.setDraftInfo(newDraftState);

            }
        ).catch((error) => {
            console.log(error)
        })

        // console.log('http://localhost:8000/', {capt: 'gtm', pick: row});
    }

    const submitPick = (availRunner: AvailableDraftRunner) => {
        let config = {headers: {'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjMyOTI0MDcyLCJlbWFpbCI6ImFAYi5jb20iLCJvcmlnX2lhdCI6MTYzMjQ5MjA3Mn0.K3pMT_nA96x76sAseMjh3L3fb9Js_AgsrERDp0eRbNQ'}}
        axios.put("http://localhost:8000/api/draft-runner/" + availRunner.id + "/", {
            "draft_type": availRunner.draft_type,
            "draft_status": "picked",
            "description": availRunner.description,
            "order_drafted": draftState.picked_draft_runners.length,
            "runner": availRunner.runner.id,
            "draft": availRunner.draft,
        }, config).then((response) => {
            getCurrentPicks()
        }).catch(
            (error) => {
                console.log(error)
            }
        );
    }


    useEffect(() => {
    })

    const classes = useStyles();

    return (
        <div className={'draft-window'}>
            <TableContainer className={classes.table} component={Paper}>
                <Table className={classes.table} aria-label="simple table" size={'small'}>
                    <TableHead>
                        <TableRow className={'hover-color'}>
                            <TableCell className={classes.cell}>Runner Tag</TableCell>
                            <TableCell className={classes.cell}>PB - 16 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 70 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 120 Stars</TableCell>
                            <TableCell
                                className={classes.cell}>Rank</TableCell>
                            <TableCell className={classes.cell} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draftState.available_draft_runners.map((availableDraftRunner) => (
                            <TableRow key={availableDraftRunner.runner.speedrun_name + '_drafted'}
                                      className={'hover-color'}>
                                <TableCell className={classes.cell} component="th" scope="row">
                                    {availableDraftRunner.runner.speedrun_name}
                                </TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb16}</TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb70}</TableCell>
                                <TableCell
                                    className={classes.cell}>{availableDraftRunner.runner.runner_stat.pb120}</TableCell>

                                <TableCell className={classes.cell}>{availableDraftRunner.team}</TableCell>
                                <TableCell className={classes.cell} align={'center'}>{
                                    <Button variant={'contained'} color={'primary'}
                                            onClick={() => {
                                                submitPick(availableDraftRunner)
                                            }}
                                    >Pick</Button>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    )
}