import React from 'react'
import {Container} from "@material-ui/core";
import GithubProfile from "./githubProfile";
import SideCard from "./sideCard";


export default function SideBar(){
    return(
        <Container>
            <GithubProfile/>
            <SideCard/>
        </Container>
    )
}

