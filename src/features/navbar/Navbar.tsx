import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './Navbar.module.css'

export function Navbar(): JSX.Element {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li><img src={logo} className={styles.navlogo} alt="logo" /></li>
                <li><Link to="/">Accueil</Link></li>
                <li className={styles.navfloat}><Link to="/profile">Mon profil</Link></li>
                <li className={styles.navfloat}><Link to="/login">Connexion</Link></li>
                <li className={styles.navfloat}><Link to="/camera">Test caméra</Link></li>
            </ul>
        </nav >
    );
}