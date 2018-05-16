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

const T = ({ lang, children }) => {
    return <span>{TRANSLATES[lang][children] || children}</span>;
};

export default connect(mapStateToProps, {})(T);