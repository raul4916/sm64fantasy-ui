import {Component} from "react";
import {Content} from "./Content";

export class ContentRow extends Component {

    contentRow() {
        return (
            <div>
                <div className={'content-row'}>
                    <div className={'flex-c m-2 mb-0 content-column'}>
                        TITLE
                    </div>
                </div>
                <div className={'content-row overflow-hidden mb-lg-5'}>
                    <Content/>
                    <Content/>
                    <Content/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'flex-c justify-content-start m-1'}>
                {this.contentRow()}
            </div>

        )
    }
}