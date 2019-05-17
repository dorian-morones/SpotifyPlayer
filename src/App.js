import React, { Component } from "react";
import { Router } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Layout from "./components/Layout";
import Index from "./views/home";
import Player from "./views/player";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Index} />
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
