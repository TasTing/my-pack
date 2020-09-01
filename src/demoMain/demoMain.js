import React from 'react';
import logo from '../logo.svg';
import {Container} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Route, Switch} from "react-router-dom";
import Posts from "../posts/posts";

export default function Main() {
  return (
      <main>
          <Container>
              <Toolbar/>
              <Switch>
                  <Route exact path='/'>
                      <ReactDefault/>
                  </Route>
                  <Route path='/posts'>
                      <Posts/>
                  </Route>
              </Switch>
          </Container>
      </main>
  )
}

function ReactDefault(){
    return(
        <div>
            <img src = {logo} className = "App-logo" alt = "logo" />
            <p> Edit <code> src / App.js </code> and save to reload. </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React </a>
        </div>
    )
}
