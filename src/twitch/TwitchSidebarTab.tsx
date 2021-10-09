import "../less/main.css";
import axios from "axios";
import {ReactElement, useState} from "react";
import Cookies from "universal-cookie";

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

type TwitchInfo = { type: string; user_name: string; thumbnail_url: string; game_name: string; }

// axios.get('https://backend.sm64fantasy.com/api/runner', config).then((response) => {
//         let runnersTwitch: string = '';
//         const runners = response.data;
//         runners.forEach(
//             (runner: any) => {
//                 if (runner.twitch_link !== null) {
//                     let runnerTwitch = runner.twitch_link.concat(',');
//                     runnersTwitch += (runnerTwitch);
//                 }
//                 runnersTwitch.replace('https://twitch.tv/', '')
//             }
//         );
//
//         let twitchConfig = {headers: {'Client-Id': 'zdavyjkkqizrvj9gyxznmhd2w4kvnu'}}
//         axios.get('https://api.twitch.tv/helix/streams?user_name=' + runnersTwitch, twitchConfig).then((response) => {
//                 let streamersInfo = response.data
//
//
//                 let streamers = streamersInfo.map((streamer: TwitchInfo) => {
//                     if (streamer.type !== 'live') {
//                         return;
//                     }
//
//                     return (<div className={'twitch-sidebar-tab justify-content-center'}>
//                             <TwitchTabInfo
//                                 twitchLink={"https://twitch.tv/" + streamer.user_name}
//                                 twitchProfileImgLink={streamer.thumbnail_url}
//                                 twitchGametag={streamer.user_name}
//                                 twitchGame={streamer.game_name}
//                             />
//                         </div>
//                     )
//                 })
//                 setStreamerElement(streamers);
//             }
//         )
//     }
// )

// const getTwitchInfo = () => {
//     const cookies = new Cookies()
//     const config =
//         {headers: {'Authorization': 'JWT ' + cookies.get('token')}}
//
//     axios.get('https://backend.sm64fantasy.com/api/runner', config).then((response) => {
//             let runnersTwitch: string = '';
//             const runners = response.data;
//             runners.forEach(
//                 (runner: any) => {
//                     if (runner.twitch_link !== null) {
//                         let runnerTwitch = runner.twitch_link.concat(',');
//                         runnersTwitch += (runnerTwitch);
//                     }
//                     runnersTwitch.replace('https://twitch.tv/', '')
//                 }
//             );
//
//             let twitchConfig = {headers: {'Client-Id': 'zdavyjkkqizrvj9gyxznmhd2w4kvnu'}}
//             axios.get('https://api.twitch.tv/helix/streams?user_name=' + runnersTwitch, twitchConfig).then((response) => {
//                     let streamersInfo = response.data
//
//
//                     let streamers = streamersInfo.map((streamer: TwitchInfo) => {
//                         if (streamer.type !== 'live') {
//                             return;
//                         }
//
//                         return (<div className={'twitch-sidebar-tab justify-content-center'}>
//                                 <TwitchTabInfo
//                                     twitchLink={"https://twitch.tv/" + streamer.user_name}
//                                     twitchProfileImgLink={streamer.thumbnail_url}
//                                     twitchGametag={streamer.user_name}
//                                     twitchGame={streamer.game_name}
//                                 />
//                             </div>
//                         )
//                     })
//                     setStreamerElement(streamers);
//                 }
//             )
//         }
//     )
// }
export const TwitchSidebarTab = () => {
    const [streamerElement, setStreamerElement]: [ReactElement[], any] = useState([<div/>])


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