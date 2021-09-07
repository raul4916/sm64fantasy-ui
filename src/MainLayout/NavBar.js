import {Component} from "react";
import "../less/main.css";
import {ContentWindow} from "./ContentWindow";
import {Sidebar} from "./Sidebar";

export class NavBar extends Component {

    render() {
        return (
            <ul className="nav navbar nav-justified color-check">
                <li className="nav-item dark-btn">
                    <div className="text-white dark-btn" aria-current="page">League Leaders</div>
                </li>
                <li className="nav-item dark-btn">
                    <div className="text-white dark-btn" aria-current="page">Statistics</div>
                </li>
                <li className="nav-item  dark-btn">
                    <div className="text-white dark-btn" aria-current="page">Speedrunner Statistics</div>
                </li>
            </ul>
        );
    }
}