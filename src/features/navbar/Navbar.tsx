import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './Navbar.module.css'

import firebase from "firebase/app";
import 'firebase/auth';

export const Navbar = (): JSX.Element => {
    const guser = firebase.auth().currentUser;

    const handleLogout = async (event) => {
        event.preventDefault();
        await firebase.auth().signOut();
        window.location.reload();
    }

    let userElement: JSX.Element = <Link to="/login">Connexion</Link>;
    let logOutElement: JSX.Element;
    if (guser) {
        userElement = <Link to="/profile">Mon profil</Link>;
        logOutElement = <li className={styles.navfloat}><a href="#" onClick={handleLogout}>Déconnexion</a></li>;
    }


    const [, setRerender] = useState(0);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && !guser) {
            setRerender(value => ++value);
        }
    });

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li><img src={logo} className={styles.navlogo} alt="logo" /></li>
                <li><Link to="/">Accueil</Link></li>
                <li className={styles.navfloat}>{userElement}</li>
                {logOutElement}
                <li className={styles.navfloat}><Link to="/camera">Test caméra</Link></li>
            </ul>
        </nav >
    );
}