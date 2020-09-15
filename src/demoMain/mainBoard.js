import React from 'react';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
const getLanding = loader('../query/getLanding.graphql');

export default function MainBoard() {
    const {loading, error, data} = useQuery(getLanding);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    return (
        <div>

        </div>
    )
}