import {makeStyles} from '@material-ui/core/styles';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import React, {ReactElement, useEffect, useState} from 'react';
import "../bootstrap-5.1.0-dist/css/bootstrap.min.css";
import "../less/main.css";

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
    runnerTag: string,
    id: number
}

export const TeamDraftedPlayers = () => {
    const [tables, setTables]: [ReactElement[], any] = useState([]);
    const classes = useStyles();
    const players: Player[][] = []
    const getTeams = () => {
        axios.get('https://backend.sm64fantasy.com/api/team/').then((response) => {
                const teams = response.data;
                let id = 0;
                console.log(response.data)

                teams.forEach(
                    (team: any) => {
                        const roster = team.roster;
                        let rosterToDisplay: Player[] = []
                        roster.forEach((runner: any) => {
                            let teamMember: Player = {id: id, team: team.name, runnerTag: runner.speedrun_name};
                            rosterToDisplay.push(teamMember)
                            id++
                        });

                        players.push(rosterToDisplay)
                    }
                )

                playersInTeamTableCell();
            }
        )
    }


    const playersInTeamTableCell = () => {
        const prepTables: ReactElement[] = []
        players.forEach((player) => {
                prepTables.push(
                    // @ts-ignore
                    <DataGrid className={classes.container} hideFooter={true}
                              columns={[{field: 'runnerTag', headerName: player[0].team, width: 200}]}
                              rows={player}>
                    </DataGrid>
                )
            }
        );
        setTables(prepTables);
    }


    useEffect(() => {
        getTeams();
        (playersInTeamTableCell());

    }, [])


    return (
        <div className={'flex-r justify-content-center m-2 flex-wrap'}>
            {
                tables.map((table) => {
                    return (<div className={'m-4'} style={{height: "550px", width: '250px'}}>
                        {table}
                    </div>)
                })
            }
        </div>
    )
}