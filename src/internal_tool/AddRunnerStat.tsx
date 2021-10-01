import {Component, ReactElement, useEffect, useState} from "react";
import {Button, Input} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import axios from "axios";
import Cookies from "universal-cookie";
import {Alert, AlertTitle} from '@material-ui/lab';
import {AnyAction} from "@reduxjs/toolkit";
import {ContentRow} from "../content/ContentRow";

export const AddRunnerStat = () => {

    const [username, setUsername] = useState('');
    const [pb16, setPB16] = useState('');
    const [pb70, setPB70] = useState('');
    const [pb120, setPB120] = useState('');

    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const onUsername = (event: any) => {
        setUsername(event.target.value);
    }
    const onPB16Change = (event: any) => {
        setPB16(event.target.value);
    }

    const onPB70Change = (event: any) => {
        setPB70(event.target.value);
    }

    const onPB120Change = (event: any) => {
        setPB120(event.target.value);
    }


    const convertToSeconds = (time: string) => {
        if (time === '')
            return 0;
        const a = time.split(':'); // split it at the colons
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    }

    const requestAddStats = (pb: any) => {
        if (pb.time === 0)
            return;

        axios.post('http://backend.sm64fantasy.com/api/draftrunner/', pb).then(
            (response) => {

            }
        ).catch((error) => {
            setAlert(true)
        });
    }
    const createRunnerStats =
        () => {

            const pbs = {
                pb16: {
                    "type": "pb16",
                    "runner_name": username,
                    "time": convertToSeconds(pb16),
                    "status": "verified"
                },
                pb70: {
                    "type": "pb70",
                    "runner_name": username,
                    "time": convertToSeconds(pb70),
                    "status": "verified"
                },
                pb120: {
                    "type": "pb120",
                    "runner_name": username,
                    "time": convertToSeconds(pb120),
                    "status": "verified"
                },
            }

            requestAddStats(pbs.pb16)
            requestAddStats(pbs.pb70)
            requestAddStats(pbs.pb120)
        }

    const alertComponent = <Alert severity="error">
        <AlertTitle>Invalid Name</AlertTitle>
        Runner doesnt exist </Alert>

    const successComponent = (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Runner Success
        </Alert>
    )

    const createRunnerStatsComponent = () => {
        return <div className={'secondary-bg-color flex-c justify-content-center align-items-center m-1'}>
            {alert ? alertComponent : null}
            {success ? successComponent : null}
            <h3>Runner Stats</h3>
            <input className={"m-1"} type='text' onChange={onUsername} placeholder={'Runner name'}
                   value={username}/>
            <input className={"m-1"} onChange={onPB16Change} placeholder={'1:23:45'}
                   value={pb16}/>
            <input className={"m-1"} onChange={onPB70Change} placeholder={'1:23:45'}
                   value={pb70}/>
            <input className={"m-1"} onChange={onPB120Change} placeholder={'1:23:45'}
                   value={pb120}/>

            <Button className={"w-50 m-1"} color={"primary"} variant='contained' onClick={
                createRunnerStats
            }>Create stat</Button>

        </div>
    }
    return (
        <div className={'dark-content-bg'}>
            <ContentRow components={[createRunnerStatsComponent()]} title={''}/>
        </div>
    )
}