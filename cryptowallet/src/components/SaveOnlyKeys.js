import React from 'react';
import { sendPut } from "../utils";
import { t } from '../utils/translate';

const SaveOnlyKeys = ({ uuid, onOperationResult, accounts, disabled}) => {
    return (
    <button className="btn btn-primary" disabled={disabled} onClick={() =>{sendPut(
            uuid,
            {
                accounts: accounts.map(e => [e.coin.id, e.node.neutered().toBase58()]),
                encryptedMnemonics: ''
            },
            onOperationResult
            )}}>{t('Save only public keys')}</button>
        )
};

export default SaveOnlyKeys;