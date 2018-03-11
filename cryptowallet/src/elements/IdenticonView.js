import React from 'react';
import PropTypes from 'prop-types';
import { getIdenticonSVG } from "../utils/jdenticon";
import './styles/IdenticonView.css';

const Identicon = ({ seed }) => {
    const image = window.btoa(getIdenticonSVG({seed: seed}));
    return (
        <div className="IdenticonView"
             style={{backgroundImage: `url(data:image/svg+xml;base64,${image}`}}/>
    )
};

Identicon.propTypes = {
    seed: PropTypes.string.isRequired
};

export default Identicon;