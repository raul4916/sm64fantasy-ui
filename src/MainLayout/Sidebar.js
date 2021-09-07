import {Component} from "react";
import "../less/main.css";
import {TwitchSidebarTab} from "../twitch/TwitchSidebarTab";

export class Sidebar extends Component {
    render() {
        return (
            <div className={'dark-sidebar flex-column'}>
                <TwitchSidebarTab/>
                <TwitchSidebarTab/>
                <TwitchSidebarTab/>
                <TwitchSidebarTab/>
                <TwitchSidebarTab/>
            </div>
        )
    }
}