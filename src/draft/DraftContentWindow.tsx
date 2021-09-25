import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import {ContentRow} from "../content/ContentRow";
import {DraftPickTable} from "../draft/DraftPickTable";
import {DraftTable} from "../draft/DraftTable";
import {TeamDraftedPlayers} from "../draft/TeamDraftedPlayers";
import {useDispatch, useSelector} from "react-redux";
import {DraftStates} from "../MainLayout/MainWindow";
import {bindActionCreators} from "redux";
import {setDraftInfo} from "./redux/actionCreators";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";

export const DraftContentWindow = () => {

    const dispatch = useDispatch();
    const state = useSelector((state: DraftStates) => state.draftReduce)
    const draftInfo = bindActionCreators({setDraftInfo}, dispatch)

    const getCurrentPicks = () => {
        let config = {headers: {'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjMyOTI0MDcyLCJlbWFpbCI6ImFAYi5jb20iLCJvcmlnX2lhdCI6MTYzMjQ5MjA3Mn0.K3pMT_nA96x76sAseMjh3L3fb9Js_AgsrERDp0eRbNQ'}}
        axios.get('http://localhost:8000/api/get-draft-info?season_id=1', config).then((value: AxiosResponse<any>) => {

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

                console.log(newDraftState)

                draftInfo.setDraftInfo(newDraftState);

            }
        ).catch((error) => {
            console.log(error)
        })

        // console.log('http://localhost:8000/', {capt: 'gtm', pick: row});
    }

    useEffect(() => {
            setInterval(getCurrentPicks, 3000)
        }, []
    )
    return (
        <div className={'dark-content-bg'}>
            <ContentRow title="Draft Picks:" components={[<DraftPickTable/>]}/>
            <ContentRow title="Selected Runners:" components={[<DraftTable/>]}/>
            <ContentRow title="Teams:" components={[<TeamDraftedPlayers/>]}/>
        </div>
    )
}

