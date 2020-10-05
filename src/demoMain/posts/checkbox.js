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
import {CircularProgress, Container} from "@material-ui/core";
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";


const getPosts = loader('../../query/getPosts.graphql');

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
    const [state, setState] = useState({})

    useEffect(()=>{

    },)

    const {loading:postLoading, error:postError, data:postData} = useQuery(getPosts);
    if (postLoading) return <CircularProgress/>;
    if (postError) return <p>Error :(</p>;

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <Grid>
            <Container>
                <FormGroup row>
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                defaultChecked  onChange={handleChange} name="article"/>}
                        label="Article"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                defaultChecked  onChange={handleChange} name="feature"/>}
                        label="Feature"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                defaultChecked  onChange={handleChange} name="news"/>}
                        label="News"
                    />
                </FormGroup>
                <PostList posts={postData.posts} state={state}/>
            </Container>
        </Grid>
    );
}
