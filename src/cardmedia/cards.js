import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import SimpleBreadCrumb from "../breadcrumbs/breadcrumb";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Post from "../posts/post";
import IngredientReviewCard from "./card";


export default function Cards(){

    let match = useRouteMatch();
    const links = [
        {
            name: 'Home',
            link: '/'
        }, {
            name: 'Cards',
            link: '/cards'
        }
    ]

    return(
        <div>
            <SimpleBreadCrumb links={links}/>
        </div>
    )
}