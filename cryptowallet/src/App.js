import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import CryptoFalse from "./components/information/CryptoFalse";
import AppVersion from "./components/information/AppVersion";
import AppSwitcher from "./containers/AppSwitcher";
import { getOperation } from "./core/actions/operationActions";

const mapStateToProps = (state) => {
    console.log(state);
    const { check, uuid, application } = state.common;
    return {
        check,
        uuid,
        application
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        onInit: (uuid) => {
            dispatch(getOperation(uuid))
        }
    }
};

class App extends Component {

    componentWillMount() {
        const { check, uuid, onInit } = this.props;
        if (check && uuid) {
            onInit(uuid);
        }
    }

    componentDidMount() {
        document.getElementById('appLoader').style.setProperty('display', 'none');
    }

    render() {
        const { check, application } = this.props;
        if (!check) {
            return <CryptoFalse/>
        } else {
            return (
                <div className="container App">
                    <Header/>
                    <AppSwitcher application={application}/>
                </div>

            );
        }
    }
}

App.propTypes = {
    application: PropTypes.string,
    uuid: PropTypes.string,
    check: PropTypes.bool,
    onInit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapStateToDispatch)(App);
