import React from 'react';
import PropTypes from 'prop-types';

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

NextButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onOperationResult: PropTypes.func
};

export default NextButton;