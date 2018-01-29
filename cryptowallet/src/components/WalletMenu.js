import React from 'react';
import Menu from "./Menu";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";

const WalletMenu = (props) => {
    const { onClick } = props;
    return (
        <Menu>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ChangeWalletPassword/>)
                    }}>
                Change wallet password
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <ConnectWallet/>)
                    }}>
                Connect wallet
            </button>
        </Menu>
    )
};

export default WalletMenu;