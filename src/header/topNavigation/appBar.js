import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableTemporaryDrawer from "./swipeDrawer";
import Banner from "../banner/banner";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background:theme.palette.secondary.main,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    let websiteName = props.header.websiteName
    let topNav = props.header.topNav
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <SwipeableTemporaryDrawer topnav={topNav}/>
                    <Typography variant="h6" className={classes.title}>
                        {websiteName}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Banner location={props.location} topnav={topNav}/>
            {/*more content*/}
        </React.Fragment>
    );
}

