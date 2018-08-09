import React from 'react';
import { connect } from 'react-redux';
import Menu from "./Menu";
import { changeApp } from "../../core/actions/commonActions";
import define from '../../core/define'
import T from "../T";
import { TG_LINK } from "../../utils";

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
                <T>Create wallet</T>
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(CWP)}>
                <T>Change wallet password</T>
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(AW)}>
                <T>Connect wallet</T>
            </button>
            <button type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => changeApp(MT)}>
                <T>Make transaction</T>
            </button>
        </Menu>
    )
});

const OnlineMenu = () => {
    return (
        <Menu>
            <div className="OnlineMenuItem">
                <a href={TG_LINK} className="btn btn-primary btn-lg">
                    <T>Go to telegram</T>
                </a>
            </div>
            <div className="OnlineMenuItem">
                <a href="https://github.com/vasinkd/WMSCrypto/releases/latest" className="btn btn-light btn-lg">
                    <T>Download offline version</T>
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