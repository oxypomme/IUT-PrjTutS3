import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './Navbar.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { getConnection, setConnected } from '../accounts/accountSlice';

export const Navbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const guser = useSelector(getConnection);

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch({ type: 'LOGOUT_AUTH_REQUESTED' });
        dispatch(setConnected(''));
        //TODO: better reload
        window.location.reload();
    }

    let userElement: JSX.Element = <Link to="/login">Connexion</Link>;
    let logOutElement: JSX.Element;
    if (guser) {
        userElement = <Link to="/profile">Mon profil</Link>;
        logOutElement = <li className={styles.navfloat}><a href="#" onClick={handleLogout}>Déconnexion</a></li>;
    }

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