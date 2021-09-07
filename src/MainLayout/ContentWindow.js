import {Component} from "react";
import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import {ContentRow} from "../content/ContentRow";

export const ContentWindow = () => {
    const soonMario = () => {
        return (
            <div>
                <img src={"https://thumbs.gfycat.com/AmusedQuaintAlleycat-max-1mb.gif"} className="App-logo"
                     alt="logo"/>
                <p>
                    Super Mario 64 Fantasy Coming Soon
                </p>
            </div>
        )
    }

    return (
        <div className={'dark-content-bg'}>
            <ContentRow/>
            <ContentRow/>
        </div>
    )
}