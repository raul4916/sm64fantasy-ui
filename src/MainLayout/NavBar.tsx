import {Component, CSSProperties} from "react";
import "../less/main.css";
import {Link} from "react-router-dom";

type Props = {
    styleChange: CSSProperties
}

export const NavBar = () => {
    return (
        <ul className="nav navbar nav-justified color-check">
            <li className="nav-item dark-btn">
                <div className="text-white dark-btn" aria-current="page">League Leaders</div>
            </li>
            <li className="nav-item dark-btn">
                <Link to={'/draft'}>
                    <div className="text-white dark-btn" aria-current="page">Draft</div>
                </Link>
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