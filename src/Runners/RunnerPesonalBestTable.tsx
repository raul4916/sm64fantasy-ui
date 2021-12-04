import {makeStyles} from "@material-ui/core/styles";
import {DataGrid} from "@mui/x-data-grid";
import React, {ReactElement} from "react";
import {RunnerPersonalBest} from "../draft/redux/DraftReducer";

const useStyles = makeStyles({
    container: {
        maxWidth: '40rem',
        width: '100%',

        minHeight: '10rem',
        backgroundColor: '#16181D',
        borderColor: '#16181D',
        color: 'white',

    },
});


export const RunnerPesonalBestTable = (runnerStats: { runnerPersonalBest: RunnerPersonalBest, runnerPoints: RunnerPersonalBest }) => {
    const classes = useStyles()

    return (
        <DataGrid className={classes.container} hideFooter={true}
                  columns={
                      [
                          {
                              field: 'pb16',
                              headerName: "PB 16 Stars",
                              width: 200,
                          },
                          {
                              field: 'pb70',
                              headerName: "PB 70 Stars",
                              width: 200
                          },
                          {
                              field: 'pb120',
                              headerName: "PB 120 Stars",
                              width: 200
                          }
                      ]
                  }
                  rows={[{...runnerStats.runnerPersonalBest, id: 1},
                      {... runnerStats.runnerPoints, id: 2}]}
        />
    )
}