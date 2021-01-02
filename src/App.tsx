import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import firebaseApp from "./app/firebase";
import "@firebase/auth";

import { Navbar } from "./features/navbar/Navbar";
import { getIsConnected, setUid } from "./features/accounts/accountSlice";
import { fetchCurrProfile, resetCurrProfile } from "./features/accounts/profileSlice";

import { Home } from "./views/Home";
import { Login } from "./views/Login/Login";
import { NotFound } from "./views/Errors/NotFound";
import { PublicHome } from "./views/Home/PublicHome";
import { Camera } from "./../src/features/camera/Camera";
import { Profile } from "./views/Profile";
import Matches from "./views/Matches";
import { CreatePersonal, CreatePreferences, CreateFinishing, CreateConfirm } from "./views/CreateProfile";

import "./App.css";

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
                    <Route exact path='/matches' component={Matches} />
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
                    <Route exact path='/SignUp/4' component={CreateConfirm} />
                    <Route exact path='/camera' component={Camera} />
                    <Route component={NotFound} />
                </Switch>
            }
        </Router>
    );
}

export default App;
