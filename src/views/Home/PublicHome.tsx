import React from 'react';

import logo from '../../logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export function PublicHome(): JSX.Element {
    return (
        <div className="App">
            <header>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <p>
                        Edit <code>src/App.tsx</code> and save to reload. <br />
                        Prepare the <FontAwesomeIcon icon={faCoffee} /> coffee !
                    </p>
                    <span>
                        <span>Learn </span>
                        <a
                            className="App-link"
                            href="https://reactjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            React
                        </a>
                        <span>, </span>
                        <a
                            className="App-link"
                            href="https://redux.js.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Redux
                        </a>
                        <span>, </span>
                        <a
                            className="App-link"
                            href="https://redux-toolkit.js.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Redux Toolkit
                        </a>
                        ,<span> and </span>
                        <a
                            className="App-link"
                            href="https://react-redux.js.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            React Redux
                        </a>
                    </span>
                </div>
            </header>
        </div>
    );
}