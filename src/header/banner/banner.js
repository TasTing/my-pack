import React from "react";
import {Parallax, Background} from 'react-parallax';
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "10vh",
        position: 'absolute',
        paddingTop: 100,
        textAlign: 'center',
        color:'white',
    }
}));

export default function Banner(props) {
    const classes = useStyles();
    let topNav = props.topnav
    let location = props.location
    let title = ''
    let board = null
    topNav.map(nav => {
        if (nav.linkto === location) {
            if(nav.board!==null){
                board = nav.board
                title = nav.name
            }
        }
    })
    return (
        board!==null?
        <Parallax
            blur={{min: -15, max: 15}}
            bgImage={board.url}
            strength={-200}
        >
            <Container style={{height: '400px', position: 'relative'}} className={classes.title}>
                {title}
            </Container>
        </Parallax>:null
    )
}
