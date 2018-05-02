import React from 'react';
import Menu from "./Menu";
import CreateWallet from "../containers/CreateWallet";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";
import MakeTransaction from "../containers/MakeTransaction";
import { t } from '../utils/translate';


const OFFLINE_MODE = !window.location.hostname;


const OfflineMenu = ({ onClick }) => {
    return (
        <Menu>
            <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        onClick(() => <CreateWallet/>, true)
                    }}>
                {t('Create wallet')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ChangeWalletPassword/>, true)
                    }}>
                {t('Change wallet password')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ConnectWallet/>, true)
                    }}>
                {t('Connect wallet')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <MakeTransaction/>, true)
                    }}>
                {t('Make transaction')}
            </button>
        </Menu>
    )
};

const OnlineMenu = (props) => {
    return (
        <Menu>
            <div className="OnlineMenuItem">
                <a href='tg://resolve?domain=WMSCryptoBot' className="btn btn-primary btn-lg">
                    {t('Go to telegram')}
                </a>
            </div>
            <div className="OnlineMenuItem">
                <a href="https://github.com/vasinkd/WMSCrypto/releases/latest" className="btn btn-light btn-lg">
                    {t('Download offline version')}
                </a>
            </div>
        </Menu>
    )
};


const MainMenu = (props) => {
    return OFFLINE_MODE ? <OfflineMenu {...props}/> : <OnlineMenu {...props}/>
};

export default MainMenu;