import React from 'react';
import define from "../core/define";
import CreateWallet from "./CreateWallet";
import ConnectWallet from "./ConnectWallet";
import ChangeWalletPassword from "./ChangeWalletPassword";
import MakeTransaction from "./MakeTransaction";
import MainMenu from "../components/menus/MainMenu";
import StatusCard from "../components/Cards/StatusCard";

const { CW, AW, CWP, MT, ST } = define.apps;

const AppSwitcher = ({ application }) => {
    switch (application) {
        case CW:
            return <CreateWallet/>;
        case AW:
            return <ConnectWallet/>;
        case CWP:
            return <ChangeWalletPassword/>;
        case MT:
            return <MakeTransaction/>;
        case ST:
            return <StatusCard/>;
        default:
            return <MainMenu/>;
    }
};

export default AppSwitcher;
