import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "@firebase/auth";
import firebaseApp from "./app/firebase";

import { Navbar } from "./features/navbar/Navbar";
import { getConnection, setConnected } from "./features/accounts/accountSlice";

import { Home } from "./views/Home/Home";
import { Login } from "./views/Login/Login";
import { NotFound } from "./views/Errors/NotFound";
import { PublicHome } from "./views/Home/PublicHome";
import { Camera } from "./../src/features/camera/Camera";
import CreateProfile from "./views/createprofile/CreateProfile";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const isConnected = useSelector(getConnection);

  React.useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setConnected(user.uid));
      }
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        {
          !isConnected ? (
            <Route exact path='/' component={PublicHome} />
          ) : (
            <Route exact path='/' component={Home} />
          )
          // Maybe not the correct way
        }
        <Route exact path='/camera' component={Camera} />
        <ProtectedRoute exact path='/profile' component={NotFound} />
        <ProtectedRoute onlyUnlogged exact path='/login' component={Login} />
        <ProtectedRoute
          onlyUnlogged
          exact
          path='/SignUp/1'
          component={CreateProfile}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
