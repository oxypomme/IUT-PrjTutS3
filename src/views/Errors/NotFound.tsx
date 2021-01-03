import React from 'react';

import logo from '../../logo.svg';

export function NotFound(): JSX.Element {
    return (
        <div className="App">
            <header>
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