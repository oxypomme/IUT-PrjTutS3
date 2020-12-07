import React from 'react';

import logo from '../../logo.svg';

import { Counter } from '../../features/counter/Counter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


//import firebase from 'firebase/app';
//import '@firebase/database'

export function Home(): JSX.Element {
    /*const db = firebase.database();
    try {
        const logTest = async () => {
            const test = await db.ref('/profiles').once('value');
            console.log(test.val());
        }
        logTest();
    } catch (error) {
        console.log("no app");
    }
    */
    return (
        <div className="App">
            <header>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Counter />

                    <p>
                        Edit <code>src/App.js</code> and save to reload. <br />
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