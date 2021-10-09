import {Button} from "@material-ui/core";
import axios, {AxiosRequestConfig} from "axios";
import {useState} from "react";
import {useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {State} from "../App";


const temp = (config: AxiosRequestConfig | undefined) => {
    let playersArr = string.split("\n");

    const convertToSeconds = (time: string) => {
        if (time === '')
            return 0;
        const a = time.split(':'); // split it at the colons
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    }

    playersArr.forEach((player) => {
        let playerWithPb = player.split(",")
        let personalBests = [
            {time: playerWithPb[1], category: "pb120"},
            {time: playerWithPb[2], category: "pb70"},
            {time: playerWithPb[3], category: "pb16"},
        ]

        axios.get('https://backend.sm64fantasy.com/api/runner?name=' + playerWithPb[0], config).then((response) => {
            let data = response.data

            console.log(data.id);

            personalBests.forEach((personalBest: any) => {
                let pb = {time: 999999999, category: 'unknown'}

                if (personalBest.category === 'pb120') {
                    pb = {time: personalBest.time, category: 'pb120'}
                }
                if (personalBest.category === 'pb70') {
                    pb = {time: personalBest.time, category: 'pb70'}
                }
                if (personalBest.category === 'pb16') {
                    pb = {time: personalBest.time, category: 'pb16'}
                }

                if (pb.category !== 'unknown') {
                    let requestData = {
                        "type": pb.category,
                        "runner": data.id,
                        // @ts-ignore
                        "time": convertToSeconds(pb.time),
                        "status": "verified"
                    }

                    console.log(requestData);
                    axios.post('https://backend.sm64fantasy.com/api/runner-stats', requestData, config).then(() => {

                    }).then(() => {
                        console.log(playerWithPb[0]);
                        console.log(pb);
                    }).catch((error) => {
                        console.log(error)
                        console.log(playerWithPb[0]);
                        console.log(pb);
                    })
                }
            })
        })
    })

}

export const UserUploaderTemp = () => {
    const [playersToAdd, setPlayerToAdd] = useState("");

    const onChange = (event: any) => {
        setPlayerToAdd(event.target.value)
    }

    const cookies = new Cookies();

    const config =
        {headers: {'Authorization': 'JWT ' + cookies.get('token')}}

    const draftRunner = () => {
    }
    const upload = () => {
        temp(config)
    }

    const addRunnersComponent =
        <div className={'flex-c justify-content-start m-1 '}>
            <Button variant={'contained'} color={'primary'} onClick={upload}>Just Run</Button>
        </div>

    return (addRunnersComponent)
}


const string =
    "NicV,1:49:57,0:52:07,0:17:47\n"


