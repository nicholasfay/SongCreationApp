import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Songs from "./Songs";
import AddSong from "./AddSong";
import Nav from "./Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Songs} />
              <Route path="/addsong" component={AddSong} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
