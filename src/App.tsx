import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar } from './features/navbar/Navbar';

import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { Camera } from './../src/features/camera/Camera';
import { NotFound } from './views/NotFound/NotFound';
import  CreateProfile  from  './views/createprofile/CreateProfile'

import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={NotFound} />
        <Route exact path="/camera" component={Camera} />
         <Route exact path= "/SignUp/1" component={CreateProfile} />
         <Route component={NotFound} />
       
      </Switch>
    </Router>
  );
}

export default App;
