import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import {State} from "../App";
import {ContentRow} from "../content/ContentRow";
import {DraftContentWindow} from "../draft/DraftContentWindow";
import {TeamDraftedPlayers} from "../draft/TeamDraftedPlayers";
import {AddMembersToTeam} from "../internal_tool/AddingMembersToTeam";
import {AddTeams} from "../internal_tool/AddingTeams";
import {AddRunnerStat} from "../internal_tool/AddRunnerStat";
import "../less/main.css";
import {LoginComponent, updateLoginInfo} from "../login/LoginComponent";
import {loginUser} from "../login/redux/actionCreators";
import {ContentWindow} from "./ContentWindow";
import {NavBar} from "./NavBar";
import MenuAppBar from "./NavBarModern";
import {TwitchSidebar} from "./TwitchSidebar";

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
            <div className={'dark-main-bg'}>
                <AddTeams/>
                <AddRunnerStat/>
                <AddMembersToTeam/>
            </div>
        )
    }

    const teamRosterPage = () => {
        return (
            <div className={'dark-main-bg'}>
                <div className={'dark-content-bg'}>
                    <ContentRow title="Teams:" components={[<TeamDraftedPlayers/>]}/>
                </div>
            </div>)
    }
    return (
        <div>
            <BrowserRouter>
                <MenuAppBar/>
                <Switch>
                    <Route path={"/"} exact component={twitchWindowRoute}/>
                    <Route path={"/draft/"} component={draftWindowRoute}/>
                    {userState.isStaff ?
                        <Route path={"/internal-tools"} component={internalTools}/>
                        : null}
                    <Route path={"/login"} component={loginComponent}/>
                    <Route path={"/teams"} component={teamRosterPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    )

}

