import React from 'react';
import HidingCard from "../../HidingCard";
import {t} from "../../../utils/translate";
import { setState } from '../../../utils';
import NextButton from "../../NextButton";
import IntegerInput from "../../Inputs/IntegerInput";
import HexInput from "../../Inputs/HexInput";
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import SatoshiInput from "../../Inputs/SatoshInput";

class InputBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props}
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

    renderControls() {
        const { index, block, onSave } = this.props;
        const { edit } = this.state;
        if (block) {
            return null
        } else {
            return (
                <div className="save-edit-btns">
                    <NextButton title={t("Save input")}
                                disabled={!edit}
                                onClick={() => this.setState({edit: false}, onSave(index, this.state))}/>
                    <button type="button" className="btn btn-secondary" disabled={edit}
                            onClick={() => this.setState({edit: true})}>
                        {t("Edit input")}
                    </button>
                </div>
            )
        }
    }

    render() {
        const { edit, account, change, address } =  this.state;
        const { index, onDelete, block } = this.props;
        return (
            <HidingCard title={this.getTitle(index)} onDelete={!block && onDelete}>
                <HexInput {...this.getInputProps("Previous transaction hash", "prevout_hash")}/>
                <IntegerInput {...this.getInputProps("Output Id", "prevout_n")}/>
                <WalletAddressInput disabled={{all: block || !edit}}
                                    purpose={44}
                                    coin={0}
                                    account={account}
                                    change={change}
                                    address={address}
                                    onSet={(obj) => this.setState(obj)}/>
                <SatoshiInput {...this.getInputProps("Value, Satoshi", "value")}/>
                {this.renderControls()}
            </HidingCard>
        )
    }
}

InputBlock.defaultProps = {
    prevout_n: '',
    prevout_hash: '',
    account: 0,
    address: 0,
    change: 0,
    value: 0,
    edit: false,
};

export default InputBlock;