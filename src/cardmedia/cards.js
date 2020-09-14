import React from "react";
import SimpleBreadCrumb from "../breadcrumbs/breadcrumb";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IngredientReviewCard from "./card";
import {gql, useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";

export default function Cards() {


    const getCard = gql`
        query {
            cards {
                id
                title
                created_at
                description
                content
                image{
                    id
                    url
                }
            }
        }
    `
    const {loading, error, data} = useQuery(getCard);
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
                <Grid container spacing={3}>
                    {data.cards.map(card => (
                        <IngredientReviewCard card={card} key={card.id}/>
                    ))}
                </Grid>
            </Box>
        </div>

    )
}