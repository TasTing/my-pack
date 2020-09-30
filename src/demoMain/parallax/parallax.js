import React from "react";
import {Parallax} from 'react-parallax';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Button, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        position: 'absolute',
        paddingTop: 100,
        textAlign: 'center',
        color: 'white',
    },
    inside: {
        background: 'transparent',
        padding: 20,
        position: 'absolute',
        top: '50%',
        left: "50%",
        transform: 'translate(-50%,-50%)',
    },
    button:{
        marginTop:20,
    },
}));

export default function ParallaxComponent(props) {
    const classes = useStyles();
    return (
        <Parallax
            blur={{min: -1, max: 3}}
            bgImage={props.image}
            strength={500}
        >
            <Container style={{height: '400px', position: 'relative'}} className={classes.title}>
                <div className={classes.inside}>
                    <Typography variant={"h5"}>{props.title}</Typography>
                    <Button className={classes.button} variant={"contained"} href={props.link}>Learn More</Button>
                </div>
            </Container>
        </Parallax>
    )
}
