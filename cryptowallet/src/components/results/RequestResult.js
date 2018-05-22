import React from 'react';
import T from "../T";
import {dropLocation} from "../../utils";
import Card from "../Cards/Card";

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
            <Card>
                <div style={{textAlign: 'center'}}>
                    {error ? <span className="text-danger text"><T>ERROR</T></span> : null}
                    <p><T>{message}</T></p>
                    <a href="tg://resolve?domain=WMSCryptoBot">
                        <button className={`btn btn-${prefixClass}`} onClick={dropLocation}>
                            <T>Go to telegram</T>
                        </button>
                    </a>
                </div>
            </Card>
        )
    } else {
        return null
    }
};

export default RequestResult;