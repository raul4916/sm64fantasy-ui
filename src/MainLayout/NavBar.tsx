import {CSSProperties} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {State} from "../App";
import "../less/main.css";

type Props = {
    styleChange: CSSProperties
}

export const NavBar = () => {
    const userState = useSelector((state: State) => state.userReduce)

    const loginLink = (<Link to={'/login'} className={'border-light border-start  text-decoration-none'}>
        <div className="text-white dark-btn" aria-current="page">
            Login
        </div>
    </Link>)

    const userInfoNavBar = <div className="text-white dark-btn justify-content-center" aria-current="page">
        <h6>{'Welcome, ' + userState.username}</h6>
    </div>

    const internalTools = (
        <li className="nav-item dark-btn">
            <Link to={'/internal-tools'} className={'text-decoration-none'}>
                <div className="text-white dark-btn" aria-current="page">
                    Internal Tools
                </div>
            </Link>
        </li>
    )


    return (
        <ul className="nav navbar nav-justified navbar-color">

            <li className="nav-item dark-btn">
                <Link to={'/'} className={'text-decoration-none'}>
                    <div className="text-white dark-btn " aria-current="page">
                        Home
                    </div>
                </Link>
            </li>

            {/*<li className="nav-item dark-btn">*/}
            {/*    <Link to={'/draft'} className={'text-decoration-none'}>*/}
            {/*        <div className="text-white dark-btn" aria-current="page">*/}
            {/*            Draft*/}
            {/*        </div>*/}
            {/*    </Link>*/}
            {/*</li>*/}

            <li className="nav-item dark-btn">
                <Link to={'/teams'} className={'text-decoration-none'}>
                    <div className="text-white dark-btn" aria-current="page">
                        Teams
                    </div>
                </Link>
            </li>
            {userState.isStaff ? internalTools : null}
            <li className={'dark-btn'}>
                {userState.loggedIn ? userInfoNavBar : loginLink}
            </li>

        </ul>
    );
}