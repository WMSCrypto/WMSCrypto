import React from 'react';

const Card = ({ hide, children }) => {
    if (hide) {
        return null
    } else {
        return (
            <div className="card">
                <div className="card-body">
                    {children}
                </div>
            </div>
        )
    }
};

export default Card;