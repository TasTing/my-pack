import React from "react";
import {Parallax} from 'react-parallax';
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "10vh",
        position: 'absolute',
        paddingTop: 100,
        textAlign: 'center',
        color:'white',
    },
    inside: {
        background:'transparent',
        padding:20,
        position:'absolute',
        top:'50%',
        left:"50%",
        transform:'translate(-50%,-50%)',
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
        return null
    })
    return (
        board!==null?
        <Parallax
            blur={{min: -1, max: 3}}
            bgImage={board.url}
        >
            <Container style={{height: '300px', position: 'relative'}} className={classes.title}>
                <div className={classes.inside}>{title}</div>
            </Container>
        </Parallax>:null
    )
}
