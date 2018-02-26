import React from 'react';
import HidingCard from "../../HidingCard";
import {t} from "../../../utils/translate";
import IntegerInput from "../../Inputs/IntegerInput";
import HexInput from "../../Inputs/HexInput";
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import SatoshiInput from "../../Inputs/SatoshInput";

const HASH_LENGTH = 64;

const checkInput = (input) => {
    const invalidFields = ['prevout_n', 'prevout_hash', 'account', 'address', 'value', 'change'].filter(
        (v) => input[v] === ''
    );

    if (invalidFields.length) {
        return false
    }

    if (input['prevout_hash'].length !== HASH_LENGTH) {
        return false
    }

    return true
};

class InputBlock extends React.Component {

    getInputProps(label, valueName) {
        const { block, onSave, index } = this.props;
        const value = this.props.input[valueName];
        return {
            label: t(label),
            required: true,
            disabled: !!block,
            onSet: (v) => {
                const input = {...this.props.input};
                input[valueName] = v;
                onSave(index, input, checkInput(input))
            },
            value,
        }
    }

    getTitle(index) {
        const invalidElem = !(checkInput(this.props.input))
            ? <span className="badge badge-danger">invalid</span>
            : null;
        return (
            <span>{`Input ${index}`} {invalidElem}</span>
        )
    }

    render() {
        const { index, onDelete, block, onSave, input } = this.props;
        return (
            <HidingCard title={this.getTitle(index)} onDelete={!block && index && onDelete}>
                <HexInput {...this.getInputProps("Previous transaction hash", "prevout_hash")}
                          usePrefix={false} invalid={input.prevout_hash.length !== HASH_LENGTH}/>
                <IntegerInput {...this.getInputProps("Output Id", "prevout_n")}/>
                <WalletAddressInput disabled={{all: block}}
                                    purpose={44}
                                    coin={0}
                                    account={input.account}
                                    change={input.change}
                                    address={input.address}
                                    onSet={(obj) => {
                                        const newInput = {...input, ...obj};
                                        onSave(index, newInput, checkInput(newInput))
                                    }}/>
                <SatoshiInput {...this.getInputProps("Value", "value")}/>
            </HidingCard>
        )
    }
}

export default InputBlock;