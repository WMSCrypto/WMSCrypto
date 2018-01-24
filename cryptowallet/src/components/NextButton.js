import React from 'react';

const NextButton = (props) => {
    const { disabled, title, onClick } = props;
    const btnAttrs = disabled ? {disabled: true}: {};
    return (
        <button type="button" className="btn btn-success" {...btnAttrs} onClick={onClick}>
            {title}
        </button>
    )
};

export default NextButton;