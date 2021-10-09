export type RunnerInfo = {
    runnerInfo: {
        runnerName?: string;
        main_category?: string;
        twitch_link?: string;
        speedrun_link?: string;
        twitch_profile_img_link?: string;
    }

}

export const RunnerGeneralInfo = (props: RunnerInfo) => {
    return (
        <div>
            <div className={'twitch-profile-image'}></div>
            <div className={'runner-name'}>
                <h3>{props.runnerInfo.runnerName}</h3>
                <div className={'runner-links'}>
                    <div>{props.runnerInfo.twitch_link}</div>
                    <div>{props.runnerInfo.speedrun_link}</div>
                </div>
            </div>
        </div>
    )
}