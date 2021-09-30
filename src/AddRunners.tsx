import {ReactElement, useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import Cookies from "universal-cookie";
import {useSelector} from "react-redux";
import {State} from "./App";


const setupRunnerStat = (player: string, config: any) => {
    axios.get('https://www.speedrun.com/api/v1/users/' + player + '/personal-bests').then(
        //120 wkpoo02r  70 7dgrrxk4 16 n2y55mko
        (response) => {
            let personalBests: any = response.data.data;
            axios.get('http://backend.sm64fantasy.com/api/runner?name=' + player, config).then((response) => {
                let data = response.data

                console.log(data.id);

                personalBests.forEach((personalBest: any) => {
                    let pb = {time: 999999999, category: 'unknown'}

                    if (personalBest.run.category === 'wkpoo02r') {
                        pb = {time: personalBest.run.times.primary_t, category: 'pb120'}
                    }
                    if (personalBest.run.category === '7dgrrxk4') {
                        pb = {time: personalBest.run.times.primary_t, category: 'pb70'}
                    }
                    if (personalBest.run.category === 'n2y55mko') {
                        pb = {time: personalBest.run.times.primary_t, category: 'pb16'}
                    }
                    if (pb.category !== 'unknown') {
                        let requestData = {
                            "type": pb.category,
                            "runner": data.id,
                            "time": pb.time,
                            "status": "verified"
                        }

                        console.log(requestData);
                        axios.post('http://backend.sm64fantasy.com/api/runner-stats', requestData, config).then(() => {

                        }).then(() => {
                            const draftRunner = {
                                draft_type: 'fantasy',
                                draft_status: 'available',
                                description: 'runner',
                                draft: 1,
                                order_drafted: 0,
                                team: null,
                                runner: data.id,
                            }

                            axios.post('http://backend.sm64fantasy.com/api/draft-runner', draftRunner, config).catch((error) => {

                            })
                        }).catch((error) => {
                            console.log(error);
                        })
                    }
                })
            }).catch(error => {
                console.log(error);
            });
        }
    ).catch(error => {
        console.log(error);
    });
}

export const UserUploader = () => {
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
        const players = playersToAdd.split(",")
        let count = 0
        players.forEach(
            (player) => {
                count += 1
                setTimeout(() => {
                        player.replace(/\s/g, "");
                        axios.delete('http://backend.sm64fantasy.com/api/runner?name=' + player, config).catch()

                        axios.get('https://www.speedrun.com/api/v1/users/' + player).then(
                            (response) => {
                                let data = response.data.data

                                let playerInfo = {
                                    "type": 'fantasy',
                                    "discord_name": 'unknown',
                                    "description": 'speedrun player',
                                    "twitch_link": data.twitch ? data.twitch.uri : null,
                                    "twitter_link": data.twitter ? data.twitter.uri : null,
                                    "youtube_link": data.youtube ? data.youtube.uri : null,
                                    "sc_signup": data.signup,
                                    "speedrun_name": player,
                                    // "location": data.location,
                                }

                                console.log(playerInfo);
                                axios.post('http://backend.sm64fantasy.com/api/runner', playerInfo, config).then(response => {
                                    setupRunnerStat(player, config)
                                }).catch((error) => {
                                    console.log(error);
                                })

                            }
                        ).catch((error) => {
                            console.log(player)
                            console.log(error)
                        })


                    },
                    count * 10000)
                console.log(count)
            }
        )
    }

    const userState = useSelector((state: State) => state.userReduce)


    const addRunnersComponent =
        <div className={'flex-c justify-content-start m-1 '}>
            <input type={'text'} name={'players'} value={playersToAdd} onChange={onChange}
                   placeholder={'Enter SC.com players name like: "ringo792, __GTM..."'}/>
            <Button variant={'contained'} color={'primary'} onClick={upload}>UPLOAD</Button>
            <Button variant={'contained'} color={'primary'}>drafter</Button>
        </div>

    return (addRunnersComponent)
}