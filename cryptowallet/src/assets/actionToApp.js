import React from 'react';
import CreateWallet from "../containers/CreateWallet";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";
import MakeTransaction from "../containers/MakeTransaction";

export default {
    'CW': (props) => <CreateWallet {...props}/>,
    'AW': (props) => <ConnectWallet  {...props}/>,
    'CWP': (props) => <ChangeWalletPassword {...props}/>,
    'MT': (props) => <MakeTransaction {...props}/>
}