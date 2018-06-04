import React from 'react';
import { connect } from 'react-redux';
import { ru, en } from '../utils/translate';
import define from '../core/define'

const TRANSLATES = {};
const EN = define.languages.EN;
TRANSLATES[EN] = en;
TRANSLATES[define.languages.RU] = ru;

const mapStateToProps = (state) => {
    return {
        lang: state.common.lang
    }
};

const T = ({ lang, children, className, space=false, dot=false }) => {
    return (
        <span className={className || ''}>
            {TRANSLATES[lang][children] || children}
            {dot ? '. ' : ''}
            {space ? ' ': ''}
        </span>
    );
};

export default connect(mapStateToProps, {})(T);