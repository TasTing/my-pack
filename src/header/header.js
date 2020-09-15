import React from 'react';
import ButtonAppBar from "./topNavigation/appBar";
import {useLocation} from 'react-router-dom';
import MainSlider from "./mainSlider";
import {Grid, Box, Paper, Toolbar} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import SimpleCard from "./outlinedCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    box: {
        position: "absolute",
        zIndex: '1000',
        width: '100%',
        paddingTop: '30%',
        opacity:0.6,
    }
});

function Header() {
    const location = useLocation()
    if (location.pathname === '/') {
        return (
            <Grid container>
                <ButtonAppBar/>
                <Hidden mdDown>
                    <Grid item md={3}/>
                    <Grid item md={6}>
                        <div style={{position: "relative"}}>
                            <FloatContent/>
                        </div>
                    </Grid>
                    <Grid item md={3}/>
                    <MainSlider/>
                </Hidden>
            </Grid>
        )
    } else {
        return (
            <ButtonAppBar/>
        )
    }
}

function FloatContent() {
    const classes = useStyles();
    return (
        <Box shadow={3} className={classes.box}>
            <SimpleCard/>
        </Box>

    )
}


export default Header
