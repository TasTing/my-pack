import React from "react";
import SimpleBreadCrumb from "../breadcrumbs/breadcrumb";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ReviewCard from "./card";
import {useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
import { loader } from 'graphql.macro';
const getCards = loader('../query/getCards.graphql');

export default function Cards() {
    const {loading, error, data} = useQuery(getCards);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    const links = [
        {
            name: 'Home',
            link: '/'
        }, {
            name: 'Cards',
            link: '/cards'
        }
    ]

    return (
        <div>
            <SimpleBreadCrumb links={links}/>
            <Box>
                <Grid container
                      direction="row"
                      spacing={1}
                >
                    {data.cards.map(card => (
                        <ReviewCard card={card} key={card.id}/>
                    ))}
                </Grid>
            </Box>
        </div>

    )
}