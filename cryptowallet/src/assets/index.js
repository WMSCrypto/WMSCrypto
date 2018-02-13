import coins from './coins';
import { SAVE_WALLETS, SAVE_MNEMONICS } from './messages'
import actionToApp from "./actionToApp";

const messages = {
    SAVE_WALLETS,
    SAVE_MNEMONICS
};

export {
    coins,
    messages,
    actionToApp
}