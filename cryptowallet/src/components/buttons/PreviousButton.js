import React from 'react';
import PropTypes from 'prop-types';
import T from "../T";

const PreviousButton = (props) => {
    const { disabled, title, onClick } = props;
    return (
        <div>
            <button type="button" className="btn btn-white" onClick={onClick} disabled={disabled}>
                <T>{title || 'Previous'}</T>
            </button>
        </div>
    )
};

PreviousButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default PreviousButton;