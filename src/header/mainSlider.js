import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress, Button, Box} from "@material-ui/core";
const getLanding = loader('../query/getLanding.graphql');

export default function MainSlider() {
    const {loading, error, data} = useQuery(getLanding);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    return (
        <AwesomeSlider
            animation="foldOutAnimation"
            bullets={false}
            organicArrows={false}
        >
            {data.landing.feature.image.map(url => (
                <div data-src={url.url} key={url}/>
            ))}
        </AwesomeSlider>
    )
}

