import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import CryptoFalse from "./components/information/CryptoFalse";
import AppSwitcher from "./containers/AppSwitcher";
import { getOperation } from "./core/actions/operationActions";
import RequestResult from "./components/results/RequestResult";

const mapStateToProps = (state) => {
    // console.log(state.steps.current)
    // console.log(state.steps.components)
    const { check, uuid, application, error, result } = state.common;
    return {
        check,
        uuid,
        application,
        error,
        result
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
        const { check, application, uuid, error, result } = this.props;
        if (!check) {
            return <CryptoFalse/>
        } else {
            return (
                <div className="App container" style={{maxWidth: 800}}>
                    <Header/>
                    <AppSwitcher application={application} uuid={uuid}/>
                    <RequestResult error={error} result={result}/>
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
    error: PropTypes.any,
    result: PropTypes.any
};

export default connect(mapStateToProps, mapStateToDispatch)(App);
