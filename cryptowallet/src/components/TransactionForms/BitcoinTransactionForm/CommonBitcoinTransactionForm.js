import React from 'react';
import JSONUploader from "../../JSONUploader";

const CommonBitcoinTransactionForm = (props) => {
    const { amount, receiver, fee, onUploadFile, onSetManual } = props;
    return (
        <div>
            <div className="form-group">
                <label>Amount</label>
                <input type="text" className="form-control" disabled={true} value={amount || ''}/>
            </div>
            <div className="form-group">
                <label>Receiver</label>
                <input type="text" className="form-control" disabled={true} value={receiver || ''}/>
            </div>
            <div className="form-group">
                <label>Fee</label>
                <input type="text" className="form-control" disabled={true} value={fee || ''}/>
            </div>
            {(onUploadFile)
                ? <JSONUploader/>
                : null }
            {(onSetManual)
                ? <button className="btn btn-primary btn-sm" onClick={onSetManual}>Create manual</button>
                : null }
        </div>
    )
};

export default CommonBitcoinTransactionForm;