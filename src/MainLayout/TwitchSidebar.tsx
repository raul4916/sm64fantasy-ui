import axios from "axios";
import "../less/main.css";
import {TwitchSidebarTab} from "../twitch/TwitchSidebarTab";

type Props = {}

export const TwitchSidebar = (props: Props) => {

    return (
        <div className={'dark-sidebar flex-column'}>
            <TwitchSidebarTab/>
        </div>
    )
}