import React from 'react';
import Menu from "./Menu";
import CreateWallet from "../containers/CreateWallet";
import WalletMenu from "./WalletMenu";

const MainMenu = (props) => {
    const { onClick } = props;
    return (
        <Menu>
            <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        onClick(() => <CreateWallet/>, true)
                    }}>
                Create wallet
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => {
                        onClick(() => <WalletMenu onClick={onClick}/>)
                    }}>
                I have wallet
            </button>
        </Menu>
    )
};

export default MainMenu;