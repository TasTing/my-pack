import React from 'react';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {Image, Transformation} from "cloudinary-react";
import SideBar from "./sideBar";

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
    return (
        <Grid container>
            <Grid item xs={12} md={8}>
                <ReactMarkdown
                    source={data.landing.content}
                    renderers={renderers}
                />
            </Grid>
            <Grid item={true} xs={12} md={4}>
                <SideBar/>
            </Grid>
        </Grid>
    )
}