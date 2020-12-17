import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '@firebase/auth'
import firebaseApp from './app/firebase'

import { setConnected } from './features/accounts/accountSlice';
import { Navbar } from './features/navbar/Navbar';

import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { Camera } from './../src/features/camera/Camera';
import { NotFound } from './views/Errors/NotFound';
import CreateProfile from './views/createprofile/CreateProfile'

import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App(): JSX.Element {
  const dispatch = useDispatch();
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch(setConnected(user.uid));
    }
  });

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/camera" component={Camera} />
        <ProtectedRoute exact path="/profile" component={NotFound} />
        <ProtectedRoute onlyUnlogged exact path="/login" component={Login} />
        <ProtectedRoute onlyUnlogged exact path="/SignUp/1" component={CreateProfile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
