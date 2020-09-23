import {useQuery} from "@apollo/client";
import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from "@material-ui/core/Grid";
import PostList from "./list";
import {CircularProgress, Container} from "@material-ui/core";
import {loader} from 'graphql.macro';


const getPosts = loader('../query/getPosts.graphql');

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels(props) {
    const [state, setState] = useState({
        article: true,
        feature: true,
        news: true,
        checkedD: true,
        checkedE: true,
    });

    useEffect(() => {
        if (state.article === false) {
            console.log(state.article)
        }
        if (state.feature === false) {
            console.log(state.feature)
        }
        if (state.news === false) {
            console.log(state.news)
        }
    }, [state])

    const Loading = () => {

    }

    const {loading, error, data} = useQuery(getPosts);
    // requires modification
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    const posts = data.posts

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <Grid>
            <Container>
                <FormGroup row>
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.article} onChange={handleChange} name="article"/>}
                        label="Article"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.feature} onChange={handleChange} name="feature"/>}
                        label="Feature"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.news} onChange={handleChange} name="news"/>}
                        label="News"
                    />
                </FormGroup>
                <PostList posts={posts}/>
            </Container>
        </Grid>
    );
}
