import React from 'react';
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
import { loader } from 'graphql.macro';
import {useQuery} from "@apollo/client";
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
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
        checkedE: true,
    });

    const {loading, error, data} = useQuery(getPosts,{variables:{filter:'feature'}});
    // requires modification
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    const posts = data.posts

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
        if(event.target.checked===false){
            console.log(event.target.name)
            console.log(posts)
        }
    };


    return (
        <Grid>
            <Container>
                <FormGroup row>
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.checkedA} onChange={handleChange} name="checkedA"/>}
                        label="Article"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.checkedB} onChange={handleChange} name="checkedB"/>}
                        label="Feature"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                                                checked={state.checkedC} onChange={handleChange} name="checkedC"/>}
                        label="News"
                    />
                </FormGroup>
                <PostList posts={posts}/>
            </Container>
        </Grid>
    );
}
