import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "@firebase/auth";
import firebaseApp from "./app/firebase";

import { Navbar } from "./features/navbar/Navbar";
import { getIsConnected, setUid } from "./features/accounts/accountSlice";

import { Home } from "./views/Home";
import { Login } from "./views/Login/Login";
import { NotFound } from "./views/Errors/NotFound";
import { PublicHome } from "./views/Home/PublicHome";
import { Camera } from "./../src/features/camera/Camera";
import { Profile } from "./views/Profile";
import MyMatches from "./views/Matches";
import { CreatePersonal, CreatePreferences, CreateFinishing } from "./views/CreateProfile";

import "./App.css";
import { fetchCurrProfile, resetProfiles, resetCurrProfile } from "./features/accounts/profileSlice";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const isConnected = useSelector(getIsConnected);

  React.useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUid(user.uid));
        dispatch(fetchCurrProfile());
      } else {
        dispatch(setUid(''));
        dispatch(resetCurrProfile());
        dispatch(resetProfiles())
      }
    });
  }, []);

  return (
    <Router>
      <Navbar />
      { isConnected &&
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/camera' component={Camera} />
          <Route exact path='/matches' component={MyMatches} />
          <Route component={NotFound} />
        </Switch>
      }
      { !isConnected &&
        <Switch>
          <Route exact path='/' component={PublicHome} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/SignUp/1' component={CreatePersonal} />
          <Route exact path='/SignUp/2' component={CreatePreferences} />
          <Route exact path='/SignUp/3' component={CreateFinishing} />
          <Route exact path='/camera' component={Camera} />
          <Route component={NotFound} />
        </Switch>
      }
    </Router>
  );
}

export default App;
