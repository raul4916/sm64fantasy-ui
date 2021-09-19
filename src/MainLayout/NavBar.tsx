import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {createTheme, ThemeProvider} from "@mui/material/styles";

export const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <ThemeProvider
                theme={createTheme({
                    palette: {
                        primary: {
                            main: '#16181D',
                        },
                        secondary: {
                            main: '#3a3f4d',
                        },
                    }
                })}
            >
                < AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            SM64 Fantasy
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>

    )
        ;
}