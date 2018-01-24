import React, { Component } from 'react';
import CreateWallet from './containers/CreateWallet';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">CryptoWallet</span>
                </nav>
                <CreateWallet/>
            </div>
        );
    }
}

export default App;
