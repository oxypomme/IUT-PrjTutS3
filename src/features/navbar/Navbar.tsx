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
                <li className={styles.navfloat}><Link to="/signin">Connexion</Link></li>
                <li className={styles.navfloat}><Link to="/signup">Inscription</Link></li>
            </ul>
        </nav >
    );
}