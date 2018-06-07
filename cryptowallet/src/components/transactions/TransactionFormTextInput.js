import React from 'react';
import { connect } from 'react-redux';
import { inputClasses } from "../../utils";
import T from "../T";
import {setForm} from "../../core/actions/transactionFormActions";

const mapStateToProps = (state) => {
    const { flatData, rawData, coin } = state.trx;
    return {
        flatData,
        rawData,
        coin
    }
};

const mapStateToDispatch = dispatch => {
    return {
        onChange: (props) => { dispatch(setForm(props)) }
    }
};

const TransactionFormTextInput = (props) => {
    const { flatData, rawData, flatKey, strict, coin } = props;
    const value = flatData[flatKey];
    const onChange = (e) => { props.onChange({
        value: e.target.value, coin, flatKey, rawData, flatData, strict
    })};
    return (
        <div className="form-group">
            <label><T>{value.name}</T></label>
            <input className={inputClasses(value.valid)}
                   value={value.view}
                   onChange={onChange}/>
        </div>
    )
};

export default connect(mapStateToProps, mapStateToDispatch)(TransactionFormTextInput)