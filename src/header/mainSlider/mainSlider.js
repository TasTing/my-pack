import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const getLanding = loader('../../query/getLanding.graphql');
const useStyles = makeStyles({
    carousel:{
        maxHeight:'900px',
        overflow:'hidden'
    }
});

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function MainSlider() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(getLanding);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;


    return (
        <AutoplaySlider
            className={classes.carousel}
            animation="openAnimation"
            bullets={false}
            organicArrows={false}
            play={true}
            cancelOnInteraction={false}
            interval={5000}
        >
            {data.landing.primaryCarousel.map(image => (
                <div data-src={image.url} key={image.id}/>
            ))}

        </AutoplaySlider>
    )
}

