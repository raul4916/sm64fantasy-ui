import {Component} from "react";
import "../less/main.css";

class TwitchTabInfo extends Component {
    render() {
        return (
            <a href={'https://www.twitch.tv/gtm__'}
               className={'flex-r text-white text-decoration-none full-width'}>
                <img className={"img-size-mini radius-round "}
                     src={'https://static-cdn.jtvnw.net/jtv_user_pictures/a200100e-1874-4715-a9ed-a24f6924f8ec-profile_image-70x70.png'}/>
                    <div className={'flex-c align-items-lg-start mx-2 full-width'}>
                    <div>GTM</div>
                    <div className={'text-sm stream-game-text'}>Super Mario 64</div>
                </div>
            </a>
        );
    }
}

export class TwitchSidebarTab extends Component {
    render() {
        return (
            <div className={'twitch-sidebar-tab justify-content-center'}>
                <TwitchTabInfo/>
            </div>
        )
    }
}