import {Component} from "react";
import "../less/main.css";
import {ContentWindow} from "./ContentWindow";
import {Sidebar} from "./Sidebar";
import {NavBar} from "./NavBar";

export class MainWindow extends Component {

    render() {
        return (
            <div>
                <NavBar/>
                <div className={'dark-main-bg'}>
                    <Sidebar/>
                    <ContentWindow/>
                </div>
            </div>
        )
    }
}