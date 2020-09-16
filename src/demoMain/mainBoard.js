import React from 'react';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {Image, Transformation} from "cloudinary-react";
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
        <div>
            <ReactMarkdown
                source={data.landing.content}
                renderers={renderers}
            />
        </div>
    )
}