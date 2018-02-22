import React from 'react';
import SomethingWrongResult from "./SomethingWrongResult";
import SuccessResult from "./SuccesResult";
import InvalidUUIDCard from "./InvalidUUIDResult";

const StatusCard = ({ status }) => {
    switch (status) {
        case 200:
            return <SuccessResult/>;
        case 404:
            return <InvalidUUIDCard/>;
        default:
            return <SomethingWrongResult/>
    }
};

export default StatusCard;
