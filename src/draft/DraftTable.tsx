import "../less/main.css";
import "../bootstrap-5.1.0-dist/css/bootstrap.min.css";
import {DataGrid} from '@mui/x-data-grid';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import {State} from "../App";
import {Button} from "@material-ui/core";
import {PickedDraftRunner} from "./redux/DraftReducer";
import axios from "axios";
import Cookies from "universal-cookie";


const useStyles = makeStyles({
    table: {
        height: "500",
        backgroundColor: '#16181D',
    },
    container: {
        maxHeight: 440,
        width: '31rem',
        backgroundColor: '#16181D',
        borderColor: '#16181D',

    },
    cell: {
        color: 'white',
        borderColor: '#16181D',
        hover: '#3a3f4d'
    }
});


export const DraftTable = () => {

    const classes = useStyles();

    const draftState = useSelector((state: State) => state.draftReduce)
    const cookies = new Cookies();
    const revertPick = (pickedDraftRunner: PickedDraftRunner) => {
        let config = {headers: {'Authorization': 'JWT ' + cookies.get('token')}}
        axios.put("http://localhost:8000/api/draft-runners/" + pickedDraftRunner.id + "/", {
            "draft_type": pickedDraftRunner.draft_type,
            "draft_status": "available",
            "description": pickedDraftRunner.description,
            "order_drafted": draftState.picked_draft_runners.length,
            "runner": pickedDraftRunner.runner.id,
            "draft": pickedDraftRunner.draft,
        }, config).catch(
            (error) => {
                console.log(error)
            }
        );

    }

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="simple table" size={'small'}>
                <TableHead>
                    <TableRow className={'hover-color'}>
                        <TableCell className={classes.cell}><h5>Name</h5></TableCell>
                        <TableCell className={classes.cell}>PB - 16 Stars</TableCell>
                        <TableCell className={classes.cell}>PB - 70 Stars</TableCell>
                        <TableCell className={classes.cell}>PB - 120 Stars</TableCell>
                        <TableCell className={classes.cell} align="right"><h5>Team</h5></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {draftState.picked_draft_runners.map((pickedDraftRunner) => (
                        <TableRow key={pickedDraftRunner.runner.speedrun_name + '_drafted'}
                                  className={'hover-color'}>
                            <TableCell className={classes.cell} component="th" scope="row">
                                {pickedDraftRunner.runner.speedrun_name}
                            </TableCell>
                            <TableCell className={classes.cell}>{pickedDraftRunner.runner.runner_stat.pb16}</TableCell>
                            <TableCell className={classes.cell}>{pickedDraftRunner.runner.runner_stat.pb70}</TableCell>
                            <TableCell className={classes.cell}>{pickedDraftRunner.runner.runner_stat.pb120}</TableCell>
                            <TableCell className={classes.cell}>{pickedDraftRunner.team}</TableCell>
                            <TableCell className={classes.cell} align={'center'}>{
                                <Button variant={'contained'} color={'primary'}
                                        onClick={() => {
                                            revertPick(pickedDraftRunner)
                                        }}
                                >Pick</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}