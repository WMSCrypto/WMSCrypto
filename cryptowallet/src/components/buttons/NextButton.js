import React from 'react';
import PropTypes from 'prop-types';
import T from "../T";

const NextButton = (props) => {
    const { disabled, title, onClick } = props;
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={onClick} disabled={disabled}>
                <T>{title || 'Next'}</T>
            </button>
        </div>
    )
};

NextButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default NextButton;