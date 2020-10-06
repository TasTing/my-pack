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
    const [state, setState] = useState({

    })

    useEffect(()=>{
        console.log(state)

    },)

    let categories = props.categories
    const {loading, error, data} = useQuery(getPosts);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    let posts = data.posts

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
        if(event.target.checked===false){
            // hide posts with specific cate
        }
        if(event.target.checked===true){
            // show posts with specific cate
        }
    };

    return (
        <Grid>
            <Container>
                <FormGroup row>
                    {categories.map(category =>(
                        <FormControlLabel
                            key={category.name}
                            control={
                                <GreenCheckbox
                                    icon={<FavoriteBorder/>}
                                    checkedIcon={<Favorite/>}
                                    defaultChecked
                                    onChange={handleChange}
                                    name={category.name}
                                />}
                            label={category.name.toUpperCase()}
                        />
                    ))}
                </FormGroup>
                <PostList posts={posts}/>
            </Container>
        </Grid>
    );
}
