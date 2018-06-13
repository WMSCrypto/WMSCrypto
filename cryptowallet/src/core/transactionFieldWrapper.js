import React from 'react';
import { connect } from 'react-redux';
import coinTo from "../components/transactions/coinTo";
import { setForm } from "./actions/transactionFormActions";

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

const _onChange = (changeFunc, e, coinField, flatKey, strict, validation, fieldsValues) => {
    let value = e.target.value;
    let update = true;
    if (value === undefined) {
        value = '';
    }
    if (value !== '' && strict) {
        update = coinField.test.input(value);
    }
    if (update) {
        changeFunc({ value, coinField, flatKey, validation, fieldsValues })
    }
};

const transactionFormWrapper = (WrappedComponent) => {
    return connect(mapStateToProps, mapStateToDispatch)((props) => {
        const { field, validation, fieldsValues, items, prefix, index=null, strict=true } = props;
        // Get for current field base
        const coinField = coinTo[props.coin].fields[field];
        // If element in array we need use flat key with info about index
        const flatKey = index !== null ? `${field}:#${index}`: field;
        const value = fieldsValues[flatKey];
        // If value undefined we use def for this field
        const view = value !== undefined ? coinField.view.input(value) : coinField.def;
        return (
            <WrappedComponent label={coinField.name}
                              valid={validation[flatKey]}
                              value={view}
                              onChange={(e) => {_onChange(
                                  props.onChange, e, coinField, flatKey, strict, validation, fieldsValues
                              )}}
                              items={items}
                              prefix={prefix}>
                {props.children}
            </WrappedComponent>
        )
    })
};


export default transactionFormWrapper;