import {Component, ReactElement, useEffect, useState} from "react";
import {Button, Input} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import axios from "axios";
import Cookies from "universal-cookie";
import {Alert, AlertTitle} from '@material-ui/lab';
import {AnyAction} from "@reduxjs/toolkit";
import {ContentRow} from "../content/ContentRow";

export const AddTeams = () => {

    const [teamName, setTeamName] = useState('');
    const [captain, setCaptain] = useState('');
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const onTeamNameChange = (event: any) => {
        setTeamName(event.target.value);
    }
    const onCaptainChange = (event: any) => {
        setCaptain(event.target.value);
    }


    const createTeam =
        () => {
            let teamData = {
                type: "fantasy",
                description: "fantasy league",
                season: 1,
                name: teamName,
                captain: captain,
            }

            axios.post('http://backend.sm64fantasy.com/api/team/', teamData).then(
                (response) => {

                }
            ).catch((error) => {
                setAlert(true)
            });
        }

    const alertComponent = <Alert severity="error">
        <AlertTitle>Invalid Name</AlertTitle>
        Captain doesnt exist </Alert>

    const successComponent = (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Team Created
        </Alert>
    )

    const dispatch = useDispatch();

    const createTeamComponent = () => {
        return <div className={'secondary-bg-color flex-c justify-content-center align-items-center m-1'}>
            {alert ? alertComponent : null}
            {success ? successComponent : null}
            <h3>Create Team:</h3>
            <input className={"m-1"} type='text' onChange={onTeamNameChange} placeholder={'internal_tool Name'}
                   value={teamName}/>
            <input className={"m-1"} onChange={onCaptainChange} placeholder={'Captain src name'}
                   value={captain}/>
            <Button className={"w-25 m-1"} color={"primary"} variant='contained' onClick={
                createTeam
            }>Create team</Button>

        </div>
    }
    return (
        <div className={'dark-content-bg'}>
            <ContentRow components={[createTeamComponent()]} title={''}/>
        </div>
    )
}
