import {Link} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import {useSelector} from "react-redux";
import {State} from "../App";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        app_bar: {
            backgroundColor: "#16181d"
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function MenuAppBar() {
    const userState = useSelector((state: State) => state.userReduce)

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const menuItems = (
        <span>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
        </span>
    )

    const internalTools = (
        <MenuItem onClick={handleClose}>
            <Link href={"/internal-tools"} color={'inherit'}>
                Internal Tools
            </Link>
        </MenuItem>
    )


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.app_bar}>
                <Toolbar>
                    <MenuDrawer/>
                    <Typography className={classes.title}/>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >

                            {userState.loggedIn ? menuItems :
                                <Link href={"/login"} color={'inherit'}>
                                    <MenuItem onClick={handleClose}>
                                        Login
                                    </MenuItem>
                                </Link>

                            }
                            {userState.isStaff ? internalTools : null}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
