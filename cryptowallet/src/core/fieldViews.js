const valueView = (v) => (Math.pow(10, -8) * v).toFixed(8);

const walletView = ({ purpose=44, coin, account, change, address }) => `m/${purpose}'/${coin}'/${account}'/${change}/${address}`;

export default {
    valueView,
    walletView
}