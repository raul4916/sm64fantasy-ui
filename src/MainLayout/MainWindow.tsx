import {Component} from "react";
import "../less/main.css";
import {TwitchSidebar} from "./TwitchSidebar";
import {NavBar} from "./NavBar";
import {DraftContentWindow} from "../draft/DraftContentWindow";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {DraftReducer} from "../draft/redux/DraftReducer";

const rootReducer = combineReducers(
    {draftReduce: DraftReducer}
);

export const MainWindow = () => {

    const store = createStore(rootReducer, {}, applyMiddleware(thunk));

    return (
        <div>
            <NavBar/>
            <div className={'dark-main-bg'}>
                <TwitchSidebar/>
                <Provider store={store}>
                    <DraftContentWindow/>
                </Provider>
            </div>
        </div>
    )
}
export type DraftStates = ReturnType<typeof rootReducer>
