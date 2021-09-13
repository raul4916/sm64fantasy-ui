import {Component} from "react";
import "../less/main.css";
import axios from "axios";

type Props = {
    twitchLink: string;
    twitchProfileImgLink: string
    twitchGametag: string
    twitchGame: string
}
const TwitchTabInfo = (props: Props) => {
    return (
        <a href={props.twitchLink}
           className={'flex-r text-white text-decoration-none full-width'}>
            <img className={"img-size-mini radius-round "}
                 src={props.twitchProfileImgLink}/>
            <div className={'flex-c align-items-lg-start mx-2 full-width'}>
                <div>{props.twitchGametag}</div>
                <div className={'text-sm stream-game-text'}>{props.twitchGame}</div>
            </div>
        </a>
    );
}
export const TwitchSidebarTab = () => {

    return (
        <div className={'twitch-sidebar-tab justify-content-center'}>
            <TwitchTabInfo
                twitchLink={''}
                twitchProfileImgLink={''}
                twitchGametag={''}
                twitchGame={''}
            />
        </div>
    )
}