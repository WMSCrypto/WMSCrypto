import React from 'react';
import { connect } from 'react-redux';
import Menu from "./Menu";
import { changeApp } from "../../core/actions/commonActions";
import define from '../../core/define'
import { t } from '../../utils/translate/index';
import T from "../T";

const OFFLINE_MODE = !window.location.hostname;
const { CW, AW, CWP, MT } = define.apps;

const mapStateToProps = (state) => {
    return {}
};

const mapPropsToDispatch = (dispatch) => {
    return {
        changeApp: (app) => {
            dispatch(changeApp(app))
        }
    }
};

const OfflineMenu = connect(mapStateToProps, mapPropsToDispatch)(({ changeApp }) => {
    return (
        <Menu>
            <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => changeApp(CW)}>
                {t('Create wallet')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(CWP)}>
                {t('Change wallet password')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(AW)}>
                {t('Connect wallet')}
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(MT)}>
                {t('Make transaction')}
            </button>
        </Menu>
    )
});

const OnlineMenu = () => {
    return (
        <Menu>
            <div className="OnlineMenuItem">
                <a href='tg://resolve?domain=WMSCryptoBot' className="btn btn-primary btn-lg">
                    {t('Go to telegram')}
                </a>
            </div>
            <div className="OnlineMenuItem">
                <a href="https://github.com/vasinkd/WMSCrypto/releases/latest" className="btn btn-light btn-lg">
                    {t('Download offline version')}
                </a>
            </div>
            <small className="text-white"><T>Offline version only for PC</T></small>
        </Menu>
    )
};


const MainMenu = (props) => {
    return OFFLINE_MODE || !process.env.WMS_VERSION ? <OfflineMenu {...props}/> : <OnlineMenu {...props}/>
};

export default MainMenu;