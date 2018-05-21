import React from 'react';
import T from "../T";
import {dropLocation} from "../../utils";

const getErrorMessage = (error) => {
    switch (error) {
        case 404:
            return "INVALID_UUID";
        default:
            return "SORRY"
    }
};

const RequestResult = ({ error, result }) => {
    if (error || result) {
        const prefixClass = error ? 'danger' : 'primary';
        const message = error ? getErrorMessage(error) : "Operation successful";
        return (
            <div className={`alert alert-${prefixClass}`} role="alert" style={{textAlign: 'center'}}>
                <p><T>{message}</T></p>
                <a href="tg://resolve?domain=WMSCryptoBot">
                    <button className={`btn btn-${prefixClass}`} onClick={dropLocation}>
                        <T>Go to telegram</T>
                    </button>
                </a>
            </div>
        )
    } else {
        return null
    }
};

export default RequestResult;