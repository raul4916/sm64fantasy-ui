import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import {ContentRow} from "../content/ContentRow";
import {DraftPickTable} from "../draft/DraftPickTable";
import {Content} from "../content/Content";
import {DraftTable} from "../draft/DraftTable";
import {TeamDraftedPlayers} from "../draft/TeamDraftedPlayers";

export const ContentWindow = () => {
    return (
        <div className={'dark-content-bg'}>
            <ContentRow title="Draft Picks:" components={[<DraftPickTable/>]}/>
            <ContentRow title="Selected Runners:" components={[<DraftTable/>]}/>
            <ContentRow title="Teams:" components={[<TeamDraftedPlayers/>]}/>
        </div>
    )
}