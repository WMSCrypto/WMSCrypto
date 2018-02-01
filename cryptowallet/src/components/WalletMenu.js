import React from 'react';
import Menu from "./Menu";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";
import AttachETWallet from "../containers/AttachETWallet";
import MakeTransaction from "../containers/MakeTransaction";


const WalletMenu = (props) => {
    const { onClick } = props;
    return (
        <Menu>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ChangeWalletPassword/>, true)
                    }}>
                Change wallet password
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ConnectWallet/>, true)
                    }}>
                Connect wallet
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <AttachETWallet/>, true)
                    }}>
                Attach ETC/ETC wallet
            </button>
            <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        onClick(() => <MakeTransaction/>, true)
                    }}>
                Make transaction
            </button>
        </Menu>
    )
};

export default WalletMenu;