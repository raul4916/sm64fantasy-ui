import "../less/main.css";
import '../bootstrap-5.1.0-dist/css/bootstrap.css'
import {ContentRow} from "../content/ContentRow";
import {CategoryPointStandings} from "../statistics/CategoryPointsStandings";

export const ContentWindow = () => {
    return (
        <div className={'dark-content-bg'}>
            <ContentRow title="Player Standings" components={[<CategoryPointStandings/>]}/>
        </div>
    )
}