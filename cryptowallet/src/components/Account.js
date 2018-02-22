import React from 'react';

const Account = (props) => {
    return (
        <div>
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.coin.name}</h5>
                    <p className="card-text hashString">{`${props.node.neutered().toBase58()}`}</p>
                </div>
            </div>
        </div>
    )
};

export default Account;