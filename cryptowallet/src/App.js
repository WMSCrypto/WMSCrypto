import React, { Component } from 'react';
import MainMenu from "./components/MainMenu";
import { Header } from './components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { setLang } from './utils/translate';
import { messages } from './assets';
import StatusCard from "./components/Cards/StatusCard";
import { cryptoCheck, getUUID } from "./utils";
import { getOperation } from "./core/requests";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: null,
            showReload: false,
            uuid: null,
            data: null,
            lang: 'ru',
            check: false
        }
    }

    componentWillMount() {
        if (cryptoCheck()) {
            this.setState({check: true}, () => {
                const uuid = getUUID();
                if (uuid) {
                    this.setState({ uuid });
                    getOperation(uuid, this);
                }
            })
        }
    }

    onOperationResult(status, data, uuid) {
        this.setState({application: () => <StatusCard status={status}/>})
    }

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    reloadApplication() {
        const application = this.state.application;
        this.setState({application: () => <div/>}, () => this.setState({ application }))
    }

    renderBaseMenu() {
        const { uuid } = this.state;
        if (uuid) {
            return <p style={{color: '#ffffff'}}>Data loading...</p>
        } else {
            return (
                <MainMenu onClick={(f, r=false) => {this.setState({application: f, showReload: r})}}/>
            )
        }
    }

    setLang(lang) {
        setLang(lang);
        this.setState({lang})
    }

    render() {
        const { application, showReload, uuid, data, encryptedMnemonics, lang, check } = this.state;
        if (!check) {
            return (
                <div className="CenterMessage">
                    <div>
                        <p>{messages.CRYPTO_FALSE_EN}</p>
                        <p>{messages.CRYPTO_FALSE_RU}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="container App" style={{maxWidth: 800}}>
                <Header showMenu={!!application}
                        showReload={showReload}
                        uuid={uuid}
                        goToMainMenu={() => this.setState({application: null, showReload: false})}
                        reloadApplication={() => this.reloadApplication()}
                        onChangeLang={() => this.setLang(lang === 'en' ? 'ru' : 'en')}
                        lang={lang}/>
                { application ? application({
                    uuid,
                    data,
                    encryptedMnemonics,
                    onOperationResult: this.onOperationResult.bind(this)
                }) : this.renderBaseMenu()}
                <div className="version"><small>{process.env.WMS_VERSION ? `version ${process.env.WMS_VERSION}` : 'development mode'}</small></div>
            </div>
        );
    }
}

export default App;
