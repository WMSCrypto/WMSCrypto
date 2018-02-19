import React from 'react';
import HidingCard from "../../HidingCard";
import {t} from "../../../utils/translate";
import NextButton from "../../NextButton";

const RBF = '0xfffffffd';
const NOT_RBF = '0xfffffffe';

const intTest = (v) => v ? /^\d+$/.test(v) : true;
const addressTest = (v) => v ? /^0x[\da-fA-F]{40}$/.test(v) : false;
const hexTest = (v) => v ? /^0x[\da-fA-F]*$/.test(v) : true;
const valueTest = (v) => v ? /^\d+\.?\d{0,18}$/.test(v) : true;

class InputBlock extends React.Component {

    constructor(props) {
        super(props);
        const { nSequence } = props;
        this.state = {
            ...props,
            edit: false,
            initNSequence: nSequence || NOT_RBF
        }
    }

    onChange(e, key) {
        let obj = {};
        obj[key] = e.target.value;
        this.setState(obj)
    }

    setRBF(useRBF) {
        const { initNSequence } = this.state;
        if (useRBF) {
            this.setState({nSequence: RBF})
        } else {
            this.setState({nSequence: initNSequence === RBF ? NOT_RBF : initNSequence })
        }
    }

    render() {
        const { hash, id, value, address, account, change, nSequence, edit } =  this.state;
        const { index, onDelete, onSave } = this.props;
        const useRBF = nSequence === RBF;
        return (
            <HidingCard title={`Input ${index}`} onDelete={onDelete}>
                <div className="form-group">
                    <label>Previous transaction hash</label>
                    <input type="text"
                           className="form-control"
                           disabled={!edit}
                           value={hash} onChange={(e) => {this.onChange(e, 'hash')}}/>
                </div>
                <div className="form-group">
                    <label>Output id</label>
                    <input type="text"
                           className="form-control"
                           disabled={!edit}
                           placeholder="0"
                           value={id} onChange={(e) => {this.onChange(e, 'id')}}/>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label>Account</label>
                        <input type="text"
                               className="form-control"
                               disabled={!edit}
                               placeholder="0"
                               value={account} onChange={(e) => {this.onChange(e, 'account')}}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Change</label>
                        <select className="form-control"
                                disabled={!edit}
                                value={change} onChange={(e) => {this.onChange(e, 'change')}}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Address</label>
                        <input type="text"
                               className="form-control"
                               disabled={!edit}
                               placeholder="0"
                               value={address} onChange={(e) => {this.onChange(e, 'address')}}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Value</label>
                    <input type="text"
                           className="form-control"
                           disabled={!edit}
                           placeholder="0.00"
                           value={value} onChange={(e) => {this.onChange(e, 'value')}}/>
                </div>
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
                                onClick={() => this.setState(
                                    {edit: false},
                                    onSave(index, this.state))
                                }/>
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