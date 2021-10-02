import {Component, ReactElement, useEffect, useState} from "react";
import {Button, Input} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {loginUser} from "./redux/actionCreators";
import axios from "axios";
import Cookies from "universal-cookie";
import {Alert, AlertTitle} from '@material-ui/lab';
import {UserState} from "./redux/UserReducer";
import {AnyAction} from "@reduxjs/toolkit";
import {ContentRow} from "../content/ContentRow";


export const updateLoginInfo = (userInfo: { loginUser: (userState: UserState) => (dispatch: Dispatch<AnyAction>) => void }) => {
    const cookies = new Cookies()
    const config = {headers: {'Authorization': 'JWT ' + cookies.get('token')}}

    axios.get("http://backend.sm64fantasy.com/api/user-public-info?username=" + cookies.get('username'), config).then(
        (response) => {
            userInfo.loginUser({
                role: 'captain',
                username: cookies.get('username'),
                loggedIn: true,
                isStaff: response.data.is_staff
            })
        }
    ).catch((error) => {
        console.log(error)
    });
}

export const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const onUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }
    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    let alertComponent = <Alert severity="error">
        <AlertTitle>Invalid Credentials</AlertTitle>
        Credentials incorrect or user doesnt exist </Alert>

    let successComponent = (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Redirect doesnt exist yet, but go ahead
        </Alert>
    )

    const submitCredentials =
        () => {
            axios.post('http://backend.sm64fantasy.com/api-token-auth/', {
                'username': username,
                'password': password
            }).then(
                (response) => {
                    let cookies = new Cookies();
                    cookies.set('token', response.data.token);
                    cookies.set('username', username);

                    updateLoginInfo(userInfo);
                    setAlert(false)
                    setSuccess(true)

                    window.location.href = 'http://sm64fantasy.com';

                }
            ).catch((error) => {
                setAlert(true)
            });
        }

    const createUser =
        () => {
            axios.post('http://backend.sm64fantasy.com/api/user-public-info', {
                'username': username,
                'password': password
            })
                .catch((error) => {
                    setAlert(true)
                });
        }

    const dispatch = useDispatch();
    const userInfo = bindActionCreators({loginUser}, dispatch)

    const loginComponent = () => {
        return <div className={'secondary-bg-color flex-c justify-content-center align-items-center m-1'}>
            {alert ? alertComponent : null}
            {success ? successComponent : null}
            <h3>Login:</h3>
            <input className={"m-1"} type='text' onChange={onUsernameChange} placeholder={'Username'} value={username}/>
            <input className={"m-1"} type={'password'} onChange={onPasswordChange} placeholder={'Password'}
                   value={password}/>
            <Button className={"w-25 m-1"} color={"primary"} variant='contained' onClick={
                submitCredentials
            }>Login</Button>
            <Button className={"w-50 m-1"} color={"primary"} variant='contained' onClick={
                createUser
            }>Create Account</Button>
        </div>
    }
    return (
        <div className={'dark-content-bg'}>
            <ContentRow components={[loginComponent()]} title={''}/>
        </div>
    )
}
