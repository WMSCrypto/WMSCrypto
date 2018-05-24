import React from 'react';
import { connect } from 'react-redux';
import define from "../core/define";
import CreateWallet from "./CreateWallet";
import ConnectWallet from "./ConnectWallet";
import ChangeWalletPassword from "./ChangeWalletPassword";
import MainMenu from "../components/menus/MainMenu";
import T from "../components/T";
import CreateTransaction from "./CreateTransaction";

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
            return <CreateTransaction common={common}/>;
        case ST:
            return null;
        default:
            if (common.result || common.error) {
                return null
            }

            if (common.uuid) {
                return <p className="text-white"><T>Data loading</T>...</p>
            } else {
                return <MainMenu/>;
            }
    }
};

export default connect(mapStateToProps, {})(AppSwitcher);
