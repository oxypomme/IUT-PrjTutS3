import React from 'react';
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
    }

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li><img src={logo} className={styles.navlogo} alt="logo" /></li>
                <li><Link to="/">Accueil</Link></li>
                {guser &&
                    <li className={styles.navfloat}><Link to="/profile">Mon profil</Link></li>
                }
                {guser ?
                    <li className={styles.navfloat}><a href="#" onClick={handleLogout}>Déconnexion</a></li>
                    :
                    <li className={styles.navfloat}><Link to="/login">Connexion</Link></li>
                }
                <li className={styles.navfloat}><Link to="/camera">Test caméra</Link></li>
            </ul>
        </nav >
    );
}