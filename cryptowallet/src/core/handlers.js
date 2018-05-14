import React from 'react';
import { actionToApp } from "../assets";
import StatusCard from "../components/Cards/StatusCard";

const getOperationDataHandlers = (component) => {
    const onSuccess = (data) => {
        component.setState({
            application: actionToApp[data.action],
            data: data,
            encryptedMnemonics: data.encryptedMnemonics
        });
        if (data.lang) {
            component.setLang(data.lang)
        }
    };

    const onError = (status) =>{
        component.setState({application: () => <StatusCard status={status}/>});
    };
    return [onSuccess, onError]
};

export {
    getOperationDataHandlers
}

