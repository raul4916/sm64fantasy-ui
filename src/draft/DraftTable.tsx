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
import {Button} from "@material-ui/core";
import axios, {AxiosResponse} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {getDraftInfo} from "./redux/actionCreators";
import {DraftStates} from "../MainLayout/MainWindow";


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

function createData(tag: string, pb16: string, pb70: string, pb120: string, team: string) {
    return {
        tag, pb16, pb70, pb120, team
    }
}


export const DraftTable = () => {
    const rows = [
        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", "GTM"),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", "Sexy team"),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", "The Best?"),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", "The trollers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),

        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", "GTM"),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", "Sexy team"),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", "The Best?"),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", "The trollers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),

        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", "GTM"),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", "Sexy team"),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", "The Best?"),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", "The trollers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),

        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", "GTM"),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", "Sexy team"),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", "The Best?"),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", "The trollers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),

        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", "GTM"),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", "Sexy team"),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", "The Best?"),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", "The trollers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", "The Slowers"),
    ];

    const getCurrentPicks = (row: any) => {
        // axios.get('http://localhost:8000/picks').then((value: AxiosResponse<any>) => {
        //         '{capt: \'gtm\', pick: row}'
        //     }
        // )
        // console.log('http://localhost:8000/', {capt: 'gtm', pick: row});
    }

    const classes = useStyles();

    const dispatch = useDispatch();
    const state = useSelector((state: DraftStates) => state.draftReduce)
    
    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="simple table" size={'small'}>
                <TableHead>
                    <TableRow className={'hover-color'}>
                        <TableCell className={classes.cell}>)</TableCell>
                        <TableCell className={classes.cell}>PB - 16 Stars</TableCell>
                        <TableCell className={classes.cell}>PB - 70 Stars</TableCell>
                        <TableCell className={classes.cell}>PB - 120 Stars</TableCell>
                        <TableCell className={classes.cell} align="right">Team</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.tag} className={'hover-color'}>
                            <TableCell className={classes.cell} component="th" scope="row">
                                {row.tag}
                            </TableCell>
                            <TableCell className={classes.cell}>{row.pb16}</TableCell>
                            <TableCell className={classes.cell}>{row.pb70}</TableCell>
                            <TableCell className={classes.cell}>{row.pb120}</TableCell>
                            <TableCell className={classes.cell}>{row.team}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}