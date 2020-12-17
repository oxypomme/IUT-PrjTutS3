import React from 'react';
import logo from '../../logo.svg';

export function Unauthorized(): JSX.Element {
    return (
        <div className="App">
            <header>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>403 Forbidden</h1>
                    <p>
                        Nice try, but you can&apos;t access to this right now...
                    </p>
                </div>
            </header>
        </div>
    );
}