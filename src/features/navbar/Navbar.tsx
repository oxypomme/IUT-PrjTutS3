import React from 'react';
import logo from '../../logo.svg';
import styles from './Navbar.module.css'

export function Navbar(): JSX.Element {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li><img src={logo} className={styles.navlogo} alt="logo" /></li>
                <li><a href="/">Home</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/contact">Contact</a></li>
                <li className={styles.navfloat}><a href="/about">About</a></li>
            </ul>
        </nav >
    );
}