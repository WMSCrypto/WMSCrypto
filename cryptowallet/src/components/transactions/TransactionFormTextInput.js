import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import coinTo from "./coinTo";
import { inputClasses } from "../../utils";
import { setForm } from "../../core/actions/transactionFormActions";
import T from "../T";

const mapStateToProps = (state) => {
    const { validation, fieldsValues, data, coin } = state.trx;
    return {
        fieldsValues,
        validation,
        data,
        coin
    }
};

const mapStateToDispatch = dispatch => {
    return {
        onChange: (props) => { dispatch(setForm(props)) }
    }
};

const _onChange = (changeFunc, e, coinField, flatKey, strict) => {
    let value = e.target.value;
    let update = true;
    if (value === undefined) {
        value = '';
    }
    if (value !== '' && strict) {
        update = coinField.test.input(value);
    }
    if (update) {
        changeFunc({ value, coinField, flatKey })
    }
};

const TransactionFormTextInput = (props) => {
    const { coin, field, index, validation, fieldsValues, strict } = props;
    console.log(validation)
    const coinField = coinTo[coin].fields[field];
    const flatKey = index !== null ? `${field}:#${index}`: field;
    const value = fieldsValues[flatKey];
    const view = value !== undefined ? coinField.view.input(value) : coinField.def;
    const onChange = (e) => { _onChange(props.onChange, e, coinField, flatKey, strict) };
    return (
        <div className="form-group">
            <label><T>{coinField.name}</T></label>
            <input className={inputClasses(validation[flatKey])} value={view} onChange={onChange}/>
        </div>
    )
};

TransactionFormTextInput.defaultProps = {
    strict: true,
    index: null
};

TransactionFormTextInput.propTypes = {
    coin: PropTypes.number,
    field: PropTypes.string,
    index: PropTypes.number,
    validation: PropTypes.object,
    fieldsValues: PropTypes.object,
    strict: PropTypes.bool,
};

export default connect(mapStateToProps, mapStateToDispatch)(TransactionFormTextInput)