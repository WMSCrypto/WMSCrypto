import React, { Component } from 'react';
import MainMenu from "./components/MainMenu";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: null
        }
    }

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    renderBaseMenu() {
        return (
            <MainMenu onClick={f => {this.setState({application: f})}}/>
        )
    }

    render() {
        const { application } = this.state;
        return (
            <div className="container App" style={{maxWidth: 800}}>
                <div className="AppHeader">
                    <h1>CryptoWallet</h1>
                    {application
                        ? <button type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() => this.setState({application: null})}>
                            Menu
                          </button>
                        : null}
                </div>
                { application ? application() : this.renderBaseMenu()}
            </div>
        );
    }
}

export default App;
