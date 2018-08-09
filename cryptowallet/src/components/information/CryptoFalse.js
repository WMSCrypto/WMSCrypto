import React from 'react';
import { messages } from "../../assets";

const CryptoFalse = () => {
    return (
        <div className="CenterMessage">
            <div>
                <p>{messages.CRYPTO_FALSE_EN}</p>
                <p>{messages.CRYPTO_FALSE_RU}</p>
            </div>
        </div>
    )
};

export default CryptoFalse;