import React, { Component } from 'react';
import MainMenu from "./components/MainMenu";
import { Header } from './components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { t, setLang } from './utils/translate';
import { actionToApp } from './assets';
import InvalidUUIDResult from "./components/Cards/InvalidUUIDResult";
import { dropLocation } from './utils';
import SuccessResult from "./components/Cards/SuccesResult";


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
                    if (data.action) {
                        this.setState({
                            application: actionToApp[data.action],
                            data: data.data,
                            encryptedMnemonics: data.encryptedMnemonics});
                    } else {
                        this.setState({application: () => <InvalidUUIDResult/>});
                    }
                })
                .catch(err => {
                    console.log(err);
                    dropLocation();
                })
        }
    }

    onSuccessOperation() {
        this.setState({application: () => <SuccessResult/>})
    }

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    reloadApplication() {
        const application = this.state.application;
        this.setState({application: () => <div/>}, () => this.setState({ application }))
    }

    renderBaseMenu() {
        const { lang, uuid } = this.state;
        if (uuid) {
            return <p style={{color: '#ffffff'}}>Data loading...</p>
        } else {
            return (
                <MainMenu onClick={(f, r=false) => {this.setState({application: f, showReload: r})}}
                          onChangeLang={() => this.setLang(lang === 'en' ? 'ru' : 'en')}
                          lang={lang}/>
            )
        }
    }

    setLang(lang) {
        setLang(lang);
        this.setState({lang})
    }

    render() {
        const { application, showReload, uuid, data, encryptedMnemonics } = this.state;
        return (
            <div className="container App" style={{maxWidth: 800}}>
                <Header showMenu={!uuid && !!application}
                        showReload={showReload}
                        uuid={uuid}
                        goToMainMenu={() => this.setState({application: null, showReload: false})}
                        reloadApplication={() => this.reloadApplication()}/>
                { application ? application({
                    uuid,
                    data,
                    encryptedMnemonics,
                    onSuccessOperation: () => this.onSuccessOperation()
                }) : this.renderBaseMenu()}
            </div>
        );
    }
}

export default App;
