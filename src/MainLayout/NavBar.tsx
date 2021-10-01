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
                <Link to={'/'} className={'text-decoration-none'}>
                    <div className="text-white dark-btn " aria-current="page">
                        Home
                    </div>
                </Link>
            </li>

            <li className="nav-item dark-btn">
                <Link to={'/draft'} className={'text-decoration-none'}>
                    <div className="text-white dark-btn" aria-current="page">
                        Draft
                    </div>
                </Link>
            </li>

            <Link to={'/login'} className={'border-light border-start  text-decoration-none'}>
                <div className="text-white dark-btn" aria-current="page">
                    Login
                </div>
            </Link>
        </ul>
    );
}