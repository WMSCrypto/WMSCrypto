import React from 'react';
import { connect } from 'react-redux';
import define from "../core/define";
import CreateWallet from "./CreateWallet";
import ConnectWallet from "./ConnectWallet";
import ChangeWalletPassword from "./ChangeWalletPassword";
import MakeTransaction from "./MakeTransaction";
import MainMenu from "../components/menus/MainMenu";

const { CW, AW, CWP, MT, ST } = define.apps;

const mapStateToProps = (state) => {
    return {
        common: state.common,
    }
};

const AppSwitcher = ({ application, common }) => {
    switch (application) {
        case CW:
            return <CreateWallet common={common}/>;
        case AW:
            return <ConnectWallet common={common}/>;
        case CWP:
            return <ChangeWalletPassword common={common}/>;
        case MT:
            return <MakeTransaction common={common}/>;
        case ST:
            return null;
        default:
            return <MainMenu common={common}/>;
    }
};

export default connect(mapStateToProps, {})(AppSwitcher);
