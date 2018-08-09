import React from 'react';
import T from "../T";
import {dropLocation, TG_LINK} from "../../utils";
import Card from "../Cards/Card";

const getErrorMessage = (error) => {
    const code = error.message ? parseInt(error.message.slice(0, 3), 10): error.code;
    switch (code) {
        case 404:
            return "INVALID_UUID";
        case 400:
            return "INVALID_REQUEST";
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
                    <a href={TG_LINK}>
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