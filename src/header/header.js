import React from 'react';
import ButtonAppBar from "./topNavigation/appBar";
import {useLocation} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import {loader} from "graphql.macro";


const getHeader = loader('../query/getHeader.graphql');

function Header() {
    const location = useLocation()
    // APOLLO query function
    const {loading, error, data} = useQuery(getHeader);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    const header = data.header

    if (location.pathname === '/') {
        return (
            <React.Fragment>
                <ButtonAppBar header={header} location={location.pathname}/>
                {/*add something only showing on landing page*/}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ButtonAppBar header={header} location={location.pathname}/>
            </React.Fragment>
        )
    }
}


export default Header
