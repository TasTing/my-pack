import React from 'react';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {Box, CircularProgress, Container, Divider, Grid, Toolbar, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {Image, Transformation} from "cloudinary-react";
import SideBar from "./sideBar/sideBar";
import FeatureCard from "./featureCard";
import FeatureBlock from "./feature/feature";
import ParallaxComponent from "./parallax/parallax";


const getLanding = loader('../query/getLanding.graphql');

const renderers = {
    image: props =>
        <Image
            dpr="auto"
            width="100%"
            crop="scale"
            responsiveUseBreakpoints="true"
            {...props}
        >
            <Transformation quality="auto" fetchFormat="auto"/>
        </Image>,
    heading: props =>
        <Typography {...props} gutterBottom={true} variant={`h${props.level + 3}`}/>,
    paragraph: props =>
        <Typography {...props} component={"p"} paragraph={true} variant={"body1"}/>
};

export default function MainBoard() {
    const {loading, error, data} = useQuery(getLanding);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    let landing = data.landing

    return (
        <Grid container>
            <Grid item xs={12} md={8}>
                <ReactMarkdown
                    source={landing.content}
                    renderers={renderers}
                />
            </Grid>
            <Grid item={true} xs={12} md={4}>
                <SideBar/>
            </Grid>
            <Grid item={true} xs={12}>
                <FeatureBlock/>
            </Grid>
            <Grid item={true} xs={12}>
                {landing.landingPageParallax!=null?
                    landing.landingPageParallax.map(parallax=>(
                        <ParallaxComponent title={parallax.title} image={parallax.image.url} link={parallax.link}/>
                    )):null
                }
                <SideCardWrapper/>
            </Grid>
        </Grid>
    )
}

const SideCardWrapper = () => (
    <Box>
        <Toolbar/>
        <Container>
            <Typography variant={"h4"} align={"left"}>Check out whats NEW!</Typography>
        </Container>
        <Divider/>
        <Container>
            <FeatureCard/>
        </Container>
        <Divider/>
    </Box>
)