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
import axios from "axios";


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


function createData(tag: string, pb16: string, pb70: string, pb120: string, rank: number, id: number) {
    return {tag, pb16, pb70, pb120, rank, id};
}


export const DraftPickTable = () => {

    const rows = [
        createData('Frozen yoghurt', "1:30:12", "1:30:12", "1:30:12", 1, 24),
        createData('Ice cream sandwich', "1:30:12", "1:30:12", "1:30:12", 2, 37),
        createData('Eclair', "1:30:12", "1:30:12", "1:30:12", 3, 24),
        createData('Cupcake', "1:30:12", "1:30:12", "1:30:12", 4, 67),
        createData('Gingerbread', "1:30:12", "1:30:12", "1:30:12", 5, 49),
    ];

    const submitPick = (row: any) => {
        // axios.post('http://backend.sm64fantasy.com/submit-pick', {capt: 'gtm', pick: row});
        console.log('http://backend.sm64fantasy.com/', {capt: 'gtm', pick: row});
    }

    const classes = useStyles();

    return (
        <div className={'draft-window'}>
            <TableContainer className={classes.table} component={Paper}>
                <Table className={classes.table} aria-label="simple table" size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>Runner Tag</TableCell>
                            <TableCell className={classes.cell}>PB - 16 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 70 Stars</TableCell>
                            <TableCell className={classes.cell}>PB - 120 Stars</TableCell>
                            <TableCell
                                className={classes.cell}>Rank</TableCell>
                            <TableCell className={classes.cell} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.tag}>
                                <TableCell className={classes.cell} component="th" scope="row">
                                    {row.tag}
                                </TableCell>
                                <TableCell className={classes.cell}>{row.pb16}</TableCell>
                                <TableCell className={classes.cell}>{row.pb70}</TableCell>
                                <TableCell className={classes.cell}>{row.pb120}</TableCell>
                                <TableCell className={classes.cell}>{row.rank}</TableCell>
                                <TableCell className={classes.cell} align={'right'}>{
                                    <Button variant={'contained'} color={'primary'}
                                            onClick={() => {
                                                submitPick(row)
                                            }}
                                    >Pick</Button>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    )
}