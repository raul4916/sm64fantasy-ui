import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import {ContentRow} from "../content/ContentRow";
import {DraftPickTable} from "../draft/DraftPickTable";
import {DraftTable} from "../draft/DraftTable";
import {TeamDraftedPlayers} from "../draft/TeamDraftedPlayers";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../App";
import {bindActionCreators} from "redux";
import {setDraftInfo} from "./redux/actionCreators";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import {UserUploader} from "../AddRunners";
import {LoginComponent} from "../login/LoginComponent";
import Cookies from "universal-cookie";

export const DraftContentWindow = () => {

    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.draftReduce)
    const userState = useSelector((state: State) => state.userReduce)
    const draftInfo = bindActionCreators({setDraftInfo}, dispatch)

    const cookies = new Cookies();
    const getCurrentPicks = () => {
        let config = {headers: {'Authorization': 'JWT ' + cookies.get('token')}}
        axios.get('http://backend.sm64fantasy.com/api/get-draft-info?season_id=1').then((value: AxiosResponse<any>) => {

                const season = value.data.season;
                // const draft = value.data.draft)[0];
                // const teams = value.data.teams;
                const available_draft_runners = value.data.available_draft_runners
                const picked_draft_runners = value.data.picked_draft_runners
                // const runners = value.data.runners


                const newDraftState = {
                    'season': season.id,
                    'draft': 1,
                    'teams': [],
                    'available_draft_runners': available_draft_runners,
                    'picked_draft_runners': picked_draft_runners,
                }

                // console.log(newDraftState)

                draftInfo.setDraftInfo(newDraftState);

            }
        ).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
            getCurrentPicks()
            // setInterval(getCurrentPicks, 5000)
        }, []
    )

    const UserUploaderComp = () => {
        return userState.isStaff ?
            (<ContentRow title="UserUploader" components={[<UserUploader/>]}/>) : null
    }

    return (
        <div className={'dark-content-bg'}>
            {UserUploaderComp()}
            <ContentRow title="Draft Picks:" components={[<DraftPickTable/>]}/>
            <ContentRow title="Selected Runners:" components={[<DraftTable/>]}/>
            <ContentRow title="Teams:" components={[<TeamDraftedPlayers/>]}/>
        </div>
    )
}
