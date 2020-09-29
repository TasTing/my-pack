import React from 'react';
import ButtonAppBar from "./topNavigation/appBar";
import {useLocation} from 'react-router-dom';
import {Grid} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

function Header() {
    const location = useLocation()
    if (location.pathname === '/') {
        return (
            <Grid container>
                <ButtonAppBar/>
            </Grid>
        )
    } else {
        return (
            <ButtonAppBar/>
        )
    }
}

// function FloatContent() {
//     const classes = useStyles();
//     return (
//         <Box shadow={3} className={classes.box}>
//             <SimpleCard/>
//         </Box>
//
//     )
// }


export default Header
