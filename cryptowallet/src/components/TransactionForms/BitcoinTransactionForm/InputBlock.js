import React from 'react';
import HidingCard from "../../HidingCard";
import {t} from "../../../utils/translate";
import { setState } from '../../../utils';
import NextButton from "../../NextButton";
import IntegerInput from "../../Inputs/IntegerInput";
import HexInput from "../../Inputs/HexInput";

const RBF = '0xfffffffd';
const NOT_RBF = '0xfffffffe';

class InputBlock extends React.Component {

    constructor(props) {
        super(props);
        const { sequence } = props;
        this.state = {
            prevout_n: '',
            prevout_hash: '',
            account: '',
            address: '',
            value: 0,
            change: 0,
            edit: false,
            initSequence: sequence || NOT_RBF,
            sequence: sequence || NOT_RBF
        }
    }

    setRBF(useRBF) {
        const { initSequence } = this.state;
        if (useRBF) {
            this.setState({sequence: RBF})
        } else {
            this.setState({sequence: initSequence === RBF ? NOT_RBF : initSequence })
        }
    }

    getInputProps(label, valueName) {
        const { edit } = this.state;
        const value = this.state[valueName];
        return {
            label: t(label),
            required: true,
            disabled: !edit,
            onSet: (v) => {setState(this, valueName, v)},
            value,
        }
    }

    getTitle(index) {
        const invalidFields = ['prevout_n', 'prevout_hash', 'account', 'address', 'value', 'change'].filter(
            (v) => this.state[v] === ''
        );
        const invalidElem = invalidFields.length
            ? <span className="badge badge-danger">invalid</span>
            : null;
        return (
            <span>{`Input ${index}`} {invalidElem}</span>
        )
    }

    render() {
        const { value, change, sequence, edit } =  this.state;
        const { index, onDelete, onSave } = this.props;
        const useRBF = sequence === RBF;
        return (
            <HidingCard title={this.getTitle(index)} onDelete={onDelete}>
                <HexInput {...this.getInputProps("Previous transaction hash", "prevout_hash")}/>
                <IntegerInput {...this.getInputProps("Output Id", "prevout_n")}/>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <IntegerInput {...this.getInputProps("Account", "account")}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Change</label>
                        <select className="form-control"
                                disabled={!edit}
                                value={change}
                                onChange={(e) => {this.setState({change: parseInt(e.target.value, 10)})}}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <IntegerInput {...this.getInputProps("Address", "address")}/>
                    </div>
                </div>
                <IntegerInput {...this.getInputProps("Value, Satoshi", "value")}>
                    <small className="text-muted">{value ? (Math.pow(10, -8) * value).toFixed(8) : 0.00} BTC</small>
                </IntegerInput>
               <div className="form-check">
                    <input type="checkbox"
                           className="form-check-input"
                           disabled={!edit}
                           checked={useRBF} onChange={() => {this.setRBF(!useRBF)}}/>
                   <label className="form-check-label">Use RBF</label>
                </div>
                <br/>
                <div className="save-edit-btns">
                    <NextButton title={t("Save input")}
                                disabled={!edit}
                                onClick={() => this.setState({edit: false}, onSave(index, this.state))}/>
                    <button type="button" className="btn btn-secondary" disabled={edit}
                            onClick={() => this.setState({edit: true})}>
                        {t("Edit input")}
                    </button>
                </div>
            </HidingCard>
        )
    }
}

export default InputBlock;