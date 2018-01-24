import React, { Component } from 'react';
import CreateWallet from './containers/CreateWallet';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <h1>CryptoWallet</h1>
                <CreateWallet/>
            </div>
        );
    }
}

export default App;
