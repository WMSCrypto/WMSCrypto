import React from 'react';
import PropTypes from 'prop-types';
import T from "../T";

const NextButton = (props) => {
    const { disabled, title, onClick } = props;
    const btnAttrs = disabled ? {disabled: true}: {};
    return (
        <div>
            <button type="button" className="btn btn-primary" {...btnAttrs} onClick={onClick} disabled={disabled}>
                <T>{title}</T>
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