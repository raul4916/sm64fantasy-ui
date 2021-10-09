import moment from "moment";
import {CartesianGrid, Line, XAxis, YAxis, LineChart, Legend, Tooltip} from "recharts";
import {RunnerStat, RunnerStats,} from "./RunnerStatistics";

type RunnerStatGraph =
    {
        "pb16": RunnerStat[]
        "pb70": RunnerStat[]
        "pb120": RunnerStat[]
    }
export const RunnerStatsCharts = (props: RunnerStats) => {

    const data = props.runnerStats;
    let runnerStatForGraph: RunnerStatGraph = {
        "pb16": [],
        "pb70": [],
        "pb120": []
    }

    let p16minmax = {
        min: 99999,
        max: 0
    }
    let p120minmax = {
        min: 99999,
        max: 0
    }
    let p70minmax = {
        min: 99999,
        max: 0
    }
    data.forEach((runnerStat: RunnerStat) => {
        if (runnerStat.type === "pb16") {
            if (parseInt(runnerStat.time) < p16minmax.min) {
                p16minmax.min = parseInt(runnerStat.time);
            }
            if (parseInt(runnerStat.time) > p16minmax.max) {
                p16minmax.max = parseInt(runnerStat.time);
            }

            runnerStatForGraph.pb16.push(runnerStat);
        }
        if (runnerStat.type === "pb70") {
            if (parseInt(runnerStat.time) < p70minmax.min) {
                p70minmax.min = parseInt(runnerStat.time);
            }
            if (parseInt(runnerStat.time) > p70minmax.max) {
                p70minmax.max = parseInt(runnerStat.time);
            }
            runnerStatForGraph.pb70.push(runnerStat);
        }
        if (runnerStat.type === "pb120") {
            if (parseInt(runnerStat.time) < p120minmax.min) {
                p120minmax.min = parseInt(runnerStat.time);
            }
            if (parseInt(runnerStat.time) > p120minmax.max) {
                p120minmax.max = parseInt(runnerStat.time);
            }
            runnerStatForGraph.pb120.push(runnerStat);
        }
    })

    console.log(runnerStatForGraph)

    return (
        <div className={"m-lg-5 align-items-center flex-c navbar-color "}>
            <h3>Personal Best 16 star</h3>
            <LineChart width={500} height={300} data={runnerStatForGraph.pb16}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date_added"
                       tickFormatter={(unixTime) => moment(unixTime * 1000).format('MM/DD/YY')}
                       reversed={true}

                />
                <YAxis
                    dataKey="time"
                    tickFormatter={(unixTime) => moment.utc(unixTime * 1000).format('HH:mm:ss')}
                    tickCount={10}
                    domain={[p16minmax.min - 100, p16minmax.max + 100]}
                />
                <CartesianGrid strokeDasharray="10 10"/>
                <Line type="monotone" dataKey="time" stroke="#8884d8"/>
            </LineChart>

            <h3>Personal Best 70 star</h3>
            <LineChart width={500} height={300} data={runnerStatForGraph.pb70}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                <XAxis dataKey="date_added"
                       tickFormatter={(unixTime) => moment(unixTime * 1000).format('MM/DD/YY')}
                       reversed={true}

                />
                <YAxis
                    dataKey="time"
                    tickFormatter={(unixTime) => moment.utc(unixTime * 1000).format('HH:mm:ss')}
                    tickCount={10}
                    domain={[p70minmax.min - 100, p70minmax.max + 100]}
                />
                <CartesianGrid strokeDasharray="3 3"/>
                <Line type="monotone" dataKey="time" stroke="#8884d8"/>
            </LineChart>
            <h3>Personal Best 120 star</h3>
            <LineChart width={500} height={300} data={runnerStatForGraph.pb120}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date_added"
                       tickFormatter={(unixTime) => moment(unixTime * 1000).format('MM/DD/YY')}
                       reversed={true}
                />
                <YAxis
                    dataKey="time"
                    tickFormatter={(unixTime) => moment.utc(unixTime * 1000).format('HH:mm:ss')}
                    tickCount={10}
                    domain={[p120minmax.min - 100, p120minmax.max + 100]}
                />
                <Tooltip/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Line name="PB Time" type="monotone" dataKey="time" stroke="#8884d8"/>
            </LineChart>
        </div>
    )
}