import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from "@material-ui/core/Grid";
import PostList from "./list";
import {Container} from "@material-ui/core";

const GreenCheckbox = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
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
        posts: props.posts
    });

    useEffect(() => {

    }, [state])


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
                <PostList posts={state.posts} state={state}/>
            </Container>
        </Grid>
    );
}