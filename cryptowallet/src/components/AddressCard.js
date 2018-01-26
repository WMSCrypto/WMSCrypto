import React from 'react';

const AddressCard = (props) => {
    return (
        <div>
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.coin}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.path}</h6>
                    <p className="card-text">{`xpub: ${props.node.neutered().toBase58()}`}</p>
                    <p className="card-text">{`Address: ${props.node.getAddress()}`}</p>
                </div>
            </div>
        </div>
    )
};

export default AddressCard;