import React, { Component } from 'react';
import CreateWallet from './containers/CreateWallet';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    render() {
        return (
            <div className="container App" style={{maxWidth: 800}}>
                <h1>CryptoWallet</h1>
                <CreateWallet/>
            </div>
        );
    }
}

export default App;
