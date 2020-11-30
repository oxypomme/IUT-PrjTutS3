import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar } from './features/navbar/Navbar';

import { Home } from './views/Home/Home';
import { SignIn } from './views/SignIn/SignIn';
import { SignUp } from './views/SignUp/SignUp';
import { NotFound } from './views/NotFound/NotFound';

import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
