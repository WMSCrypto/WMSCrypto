import React from 'react';
import CreateWallet from "../containers/CreateWallet";
import ChangeWalletPassword from "../containers/ChangeWalletPassword";
import ConnectWallet from "../containers/ConnectWallet";
import MakeTransaction from "../containers/MakeTransaction";

export default {
    'CW': () => <CreateWallet/>,
    'AW': () => <ConnectWallet/>,
    'CWP': () => <ChangeWalletPassword/>,
    'MT': () => <MakeTransaction/>
}