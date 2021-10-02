import {Button, Select} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentRow} from "../content/ContentRow";

export const AddMembersToTeam = () => {

    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState('');
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [teamInput, setTeamInput] = useState((<div/>));

    const onTeamNameChange = (event: any) => {
        setTeamName(event.target.value);
    }

    const onMembersChange = (event: any) => {
        setMembers(event.target.value);
    }


    useEffect(() => {
        getTeams();
    }, [])

    const addMembers =
        () => {
            let currentMembersStr = members
            let membersArr = currentMembersStr.split(',')

            membersArr.forEach((member) => {
                let teamData = {
                    team_name: teamName,
                    speedrun_name: member
                }

                axios.put('https://backend.sm64fantasy.com/api/team/', teamData).then(
                    (response) => {
                        setSuccess(true)
                        setTimeout(() => {
                            setSuccess(false)
                        }, 2000)
                    }
                ).catch((error) => {
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false)
                    }, 2000)
                });
            })

        }

    const alertComponent = <Alert severity="error">
        <AlertTitle>Invalid Name</AlertTitle>
        Captain doesnt exist </Alert>

    const successComponent = (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Team Created
        </Alert>
    )

    const addMembersToTeamComponent = () => {
        return <div className={'secondary-bg-color flex-c justify-content-center align-items-center m-1'}>
            {alert ? alertComponent : null}
            {success ? successComponent : null}
            <h3>Add Members to teams:</h3>
            <h6>Teams</h6>
            {teamInput}
            <h6>Members</h6>
            <input className={"m-1"} onChange={onMembersChange} placeholder={'ringo792,gtm,...'}/>
            <Button className={"w-25 m-1"} color={"primary"} variant='contained' onClick={
                addMembers
            }>Create team</Button>
        </div>
    }

    const getTeams = () => {
        axios.get('https://backend.sm64fantasy.com/api/team/').then((response) => {
            setTeamInput((
                <Select type={'select'} className={'bg-white w-75'} onChange={onTeamNameChange}>
                    {response.data.map((team: any) => {
                        return (
                            <option key={team} value={team.name}>{team.name}</option>
                        )
                    })}
                </Select>
            ))
        })
    }


    return (
        <div className={'dark-content-bg'}>
            <ContentRow components={[addMembersToTeamComponent()]} title={''}/>
        </div>
    )
}
