import React from 'react';
import Menu from "./Menu";
import CreateWallet from "../containers/CreateWallet";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";
import MakeTransaction from "../containers/MakeTransaction";
import { t } from '../utils/translate';

const MainMenu = (props) => {
    const { onClick } = props;
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

export default MainMenu;