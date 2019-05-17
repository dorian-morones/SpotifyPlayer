import React, { Component } from "react";
import { Router } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Layout from "./components/Layout";
//import Player from "./views/player";
import Home from "./pages/Home.js";
import Player from "./components/Player.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/player/:songId" component={Player} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.any
};

export default App;
