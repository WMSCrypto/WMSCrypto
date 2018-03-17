import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ hide, children, blankString=true }) => {
    if (hide) {
        return null
    } else {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        {children}
                    </div>
                </div>
                {blankString ? <br/> : null }
            </div>
        )
    }
};

Card.propTypes = {
    hide: PropTypes.bool,
    blankString: PropTypes.bool
};

Card.defaultProps = {
    blankString: true
};

export default Card;