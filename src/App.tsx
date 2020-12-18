import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '@firebase/auth'
import firebaseApp from './app/firebase'

import { getConnection, setConnected } from './features/accounts/accountSlice';
import { Navbar } from './features/navbar/Navbar';

import { PublicHome } from './views/Home/PublicHome';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { Camera } from './../src/features/camera/Camera';
import { NotFound } from './views/Errors/NotFound';
import CreateProfile from './views/createprofile/CreateProfile'

import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const isConnected = useSelector(getConnection);
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch(setConnected(user.uid));
    }
  });
  return (
    <Router>
      <Navbar />
      <Switch>
        {!isConnected ?
          <Route exact path="/" component={PublicHome} />
          :
          <Route exact path="/" component={Home} />
          // Maybe not the correct way
        }
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
