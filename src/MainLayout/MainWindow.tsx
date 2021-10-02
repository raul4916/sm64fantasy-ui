import {Component, useEffect} from "react";
import "../less/main.css";
import {TwitchSidebar} from "./TwitchSidebar";
import {NavBar} from "./NavBar";
import {DraftContentWindow} from "../draft/DraftContentWindow";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {loginUser} from "../login/redux/actionCreators";
import {LoginComponent, updateLoginInfo} from "../login/LoginComponent";
import {ContentWindow} from "./ContentWindow";
import {Router, Route, Link, Switch, BrowserRouter} from "react-router-dom";
import {AddTeams} from "../internal_tool/AddingTeams";
import {AddRunnerStat} from "../internal_tool/AddRunnerStat";
import {State} from "../App";
import {AddMembersToTeam} from "../internal_tool/AddingMembersToTeam";

export const MainWindow = () => {

    const dispatch = useDispatch();
    const userInfo = bindActionCreators({loginUser}, dispatch)
    const userState = useSelector((state: State) => state.userReduce)

    useEffect(() => {
        updateLoginInfo(userInfo);
    }, [])

    const draftWindowRoute = () => {
        return (
            <div className={'dark-main-bg'}>
                <DraftContentWindow/>
            </div>

        )
    }

    const twitchWindowRoute = () => {
        return (
            <div className={'dark-main-bg'}>
                <TwitchSidebar/>
                <ContentWindow/>
            </div>
        )
    }

    const loginComponent = () => {
        return (
            <div className={'dark-main-bg'}>
                <LoginComponent/>
            </div>
        )
    }

    const internalTools = () => {
        return (
            <Route path={"/internal-tools"}>
                <div className={'dark-main-bg'}>
                    <AddTeams/>
                    <AddRunnerStat/>
                    <AddMembersToTeam/>
                </div>
            </Route>
        )
    }

    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route path={"/"} exact component={twitchWindowRoute}/>
                    <Route path={"/draft/"} component={draftWindowRoute}/>
                    {userState.isStaff ?
                        <Route path={"/internal-tools"} component={internalTools}/> :
                        <Route path={"/internal-tools"} component={internalTools}/>
                    }
                    <Route path={"/login"} component={loginComponent}/>
                </Switch>
            </BrowserRouter>
        </div>
    )

}

