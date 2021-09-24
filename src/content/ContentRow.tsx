import {Component, ReactElement, useEffect} from "react";
import {Content} from "./Content";
import {DraftPickTable} from "../draft/DraftPickTable";
import {DraftTable} from "../draft/DraftTable";
import {TeamDraftedPlayers} from "../draft/TeamDraftedPlayers";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {setDraftInfo} from "../draft/redux/actionCreators";
import {randomInt} from "crypto";
import {DraftStates} from "../MainLayout/MainWindow";

type Props =
    {
        components: ReactElement[]
        title: string
    }


export const ContentRow = (props: Props) => {


    const buildComponents = (): ReactElement[] => {
        let componentsToInsert: ReactElement[] = []

        props.components.forEach((component: ReactElement) => {
            componentsToInsert.push(component);
        })

        return componentsToInsert;
    }


    const contentRow = () => {
        return (
            <div>
                <div className={'content-row'}>
                    <div className={'flex-c m-2 mb-0 content-column'}>
                        <h2>123</h2>
                    </div>
                </div>
                <div className={'content-row overflow-hidden justify-content-around'}>
                    {
                        buildComponents()
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={'flex-c justify-content-start m-1'}>
            {contentRow()}
        </div>

    )
}
