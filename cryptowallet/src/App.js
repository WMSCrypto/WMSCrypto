import React, { Component } from 'react';
import MainMenu from "./components/MainMenu";
import { Header } from './components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: null,
            showReload: false
        }
    }

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    reloadApplication() {
        const application = this.state.application;
        this.setState({application: () => <div/>}, () => this.setState({ application }))
    }

    renderBaseMenu() {
        return (
            <MainMenu onClick={(f, r=false) => {this.setState({application: f, showReload: r})}}/>
        )
    }

    render() {
        const { application, showReload } = this.state;
        return (
            <div className="container App" style={{maxWidth: 800}}>
                <Header showMenu={!!application}
                        showReload={showReload}
                        goToMainMenu={() => this.setState({application: null, showReload: false})}
                        reloadApplication={() => this.reloadApplication()}/>
                { application ? application() : this.renderBaseMenu()}
            </div>
        );
    }
}

export default App;
