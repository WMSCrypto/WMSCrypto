import React from 'react';

const NextButton = (props) => {
    const { disabled, title, onClick } = props;
    const btnAttrs = disabled ? {disabled: true}: {};
    return (
        <div>
            <button type="button" className="btn btn-primary" {...btnAttrs} onClick={onClick} disabled={disabled}>
                {title}
            </button>
        </div>
    )
};

export default NextButton;