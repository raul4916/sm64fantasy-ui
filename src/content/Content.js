import {Component} from "react";

export class Content extends Component {


    render() {
        return (
            <div className={'flex-c secondary-bg-color m-2 content-column'}>
                <script src="https://player.twitch.tv/js/embed/v1.js"></script>
                <div id="<player div ID>"></div>
                <div className={'content-head'}>
                    <h4 className={'text-start'}>Highlights</h4>
                </div>
                <div className={'content-window flex-c'}>
                    <iframe
                        src="https://player.twitch.tv/?channel=ringo792&parent=localhost"
                        muted="true"
                        allowFullScreen="true"
                        autoplay='false'
                    />
                </div>
            </div>
        )
    }
}


