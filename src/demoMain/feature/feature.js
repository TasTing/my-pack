import React from 'react'
import {Card, CardActionArea, CardHeader, CardMedia} from "@material-ui/core";

export default function FeatureBlock(props) {
    return (
        <Card>
            <CardActionArea href={'/go'}>
                <CardHeader>Hello World</CardHeader>
                <CardMedia></CardMedia>
            </CardActionArea>
        </Card>
    )

}