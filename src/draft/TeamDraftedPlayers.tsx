import "../less/main.css";
import "../bootstrap-5.1.0-dist/css/bootstrap.min.css";
import {DataGrid} from '@mui/x-data-grid';
import React, {ReactElement} from 'react';
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
import {ReactComponent} from "*.svg";

const useStyles = makeStyles({
    table: {
        backgroundColor: '#16181D',
        width: '50rem',

    },
    container: {
        maxHeight: 440,
        backgroundColor: '#16181D',
        borderColor: '#16181D',
        color: 'white',

    },
    cell: {}
});


type Player = {
    team: string,
    runnerTag: string
    id: number
}

export const TeamDraftedPlayers = () => {
    const classes = useStyles();

    const players: Player[][] = [
        [
            {id: 1, team: "bla", runnerTag: 'GTM'},
            {id: 2, team: "bla", runnerTag: 'GTM2.0'}
        ],
        [
            {id: 1, team: "bla2", runnerTag: 'GTM'},
            {id: 2, team: "bla2", runnerTag: 'GTM2.0'}
        ],
        [{
            id: 3,
            team: "bla3",
            runnerTag: 'GTM3'
        }],
        [
            {id: 1, team: "bla", runnerTag: 'GTM'},
            {id: 2, team: "bla", runnerTag: 'GTM2.0'}
        ],
        [
            {id: 1, team: "bla2", runnerTag: 'GTM'},
            {id: 2, team: "bla2", runnerTag: 'GTM2.0'}
        ],
        [{
            id: 3,
            team: "bla3",
            runnerTag: 'GTM3'
        }]
    ]
    const tables: ReactElement[] = [];

    const playersInTeamTableCell = () => {
        players.forEach((player) => {
                tables.push(
                    // @ts-ignore
                    <DataGrid className={classes.container} hideFooter={true}
                              columns={[{field: 'runnerTag', headerName: player[0].team, width: 200}]}
                              rows={player}>
                    </DataGrid>
                )
            }
        );
    }

    (playersInTeamTableCell());

    const getCurrentPicks = (row: any) => {
        // axios.get('http://localhost:8000/picks').then((value: AxiosResponse<any>) => {
        //         '{capt: \'gtm\', pick: row}'
        //     }
        // )

        console.log('http://localhost:8000/', {capt: 'gtm', pick: row});
    }

    return (
        <div className={'flex-r justify-content-center m-2 flex-wrap'}>
            {
                tables.map((table) => {
                    return (<div className={'m-4'} style={{height: "400px", width: '250px', background: "white"}}>
                        {table}
                    </div>)
                })
            }
        </div>
    )
}