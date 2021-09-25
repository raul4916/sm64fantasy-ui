import {ReactElement, useEffect} from "react";

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
                        <h2>{props.title}</h2>
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
