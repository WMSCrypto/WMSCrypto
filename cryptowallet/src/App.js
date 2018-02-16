import React, { Component } from 'react';
import MainMenu from "./components/MainMenu";
import { Header } from './components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { setLang } from './utils/translate';
import { actionToApp } from './assets';
import StatusCard from "./components/Cards/StatusCard";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: null,
            showReload: false,
            uuid: null,
            data: null,
            lang: 'en',
        }
    }


    componentWillMount() {
        const pathArray = window.location.pathname.split('/');
        const uuid = pathArray.length === 2 && pathArray[1].length ? pathArray[1] : null;
        if (uuid) {
            this.setState({uuid});
            fetch(`/api/operations/${uuid}`)
                .then(response => response.json())
                .then(data => {
                    const jData = data.data ? JSON.parse(data.data) : null;
                    const { lang } = this.state;
                    if (data.action) {
                        this.setState({
                            application: actionToApp[data.action],
                            data: jData,
                            encryptedMnemonics: data.encryptedMnemonics});
                        if (jData && jData.lang) {
                            this.setLang(jData.lang)
                        }
                    } else {
                        this.setState({application: () => <StatusCard status={404}/>});
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({application: () => <StatusCard status={null}/>});
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
        const { application, showReload, uuid, data, encryptedMnemonics, lang } = this.state;
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
            </div>
        );
    }
}

export default App;
