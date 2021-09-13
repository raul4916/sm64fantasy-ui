import {Component} from "react";
import "../less/main.css";
import {ContentWindow} from "./ContentWindow";
import {TwitchSidebar} from "./TwitchSidebar";
import {NavBar} from "./NavBar";
import {DraftPickTable} from "../draft/DraftPickTable";

export class MainWindow extends Component {

    render() {
        return (
            <div>
                <NavBar/>
                <div className={'dark-main-bg'}>
                    <TwitchSidebar/>
                    <ContentWindow/>
                </div>
            </div>
        )
    }
}