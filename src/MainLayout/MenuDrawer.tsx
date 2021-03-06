import {IconButton, SwipeableDrawer, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useSelector} from "react-redux";
import {State} from "../App";


const useStyles = makeStyles({
    list: {
        width: "20rem",
        height: "100vh",
        backgroundColor: "#282c34",
        color: "white",
    },
    link: {},
    fullList: {
        width: 'auto',
    },
});

type Anchor = 'left';

export default function MenuDrawer() {

    const userState = useSelector((state: State) => state.userReduce)

    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const loginLink = (
        <Link to={'/login'} className={'text-decoration-none text-white'}>
            <ListItem button key={'teams'}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={"Login"}/>
            </ListItem>
        </Link>

    )

    const list = (anchor: Anchor) => (
            <div
                className={clsx(classes.list)}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                    <Link to={'/'} className={'text-decoration-none text-white'}>
                        <ListItem button key={'teams'}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText className={'text-decoration-none'} primary={'Home'}/>
                        </ListItem>
                    </Link>
                    <Link to={'/teams'} className={'text-decoration-none text-white'}>
                        <ListItem button key={'teams'}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText className={'text-decoration-none'} primary={'Teams'}/>
                        </ListItem>
                    </Link>

                    {!userState.loggedIn ? loginLink : null}
                </List>
            </div>
        )
    ;

    return (
        <div>
            {(['left'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)} edge="start"
                                color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onOpen={toggleDrawer(anchor, true)}
                        onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
