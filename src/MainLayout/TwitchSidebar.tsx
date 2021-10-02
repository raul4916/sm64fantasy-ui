import axios from "axios";
import "../less/main.css";
import {TwitchSidebarTab} from "../twitch/TwitchSidebarTab";

type Props = {}

export const TwitchSidebar = (props: Props) => {

    const getTwitchInfo = () => {
        axios.get('api.twitch.tv').then((respone) => {

        })
    }

    return (
        <div className={'dark-sidebar flex-column'}>
            <TwitchSidebarTab/>
        </div>
    )
}