import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { Navbar } from '../../features/navbar/Navbar';

export function NotFound(): JSX.Element {
    return (
        <div className="App">
            <header>
                <Navbar />
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>404 Not Found</h1>
                    <p>
                        Seems like you&apos;re lost ...
                </p>
                </div>
            </header>
        </div>
    );
}