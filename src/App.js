import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ButtonAppBar from './pages/navbar'
import Home from './pages/Home'
import CreatePoll from './pages/CreatePoll'
import Poll from './pages/viewpoll'
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        
          <ButtonAppBar/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/poll/:id">
            <Poll />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreatePoll />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}



export default App;
