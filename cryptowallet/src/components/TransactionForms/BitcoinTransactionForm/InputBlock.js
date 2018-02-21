import React from 'react';
import HidingCard from "../../HidingCard";
import {t} from "../../../utils/translate";
import IntegerInput from "../../Inputs/IntegerInput";
import HexInput from "../../Inputs/HexInput";
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import SatoshiInput from "../../Inputs/SatoshInput";

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
                onSave(index, input)
            },
            value,
        }
    }

    getTitle(index) {
        const invalidFields = ['prevout_n', 'prevout_hash', 'account', 'address', 'value', 'change'].filter(
            (v) => this.props.input[v] === ''
        );
        const invalidElem = invalidFields.length
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
                          usePrefix={false}/>
                <IntegerInput {...this.getInputProps("Output Id", "prevout_n")}/>
                <WalletAddressInput disabled={{all: block}}
                                    purpose={44}
                                    coin={0}
                                    account={input.account}
                                    change={input.change}
                                    address={input.address}
                                    onSet={(obj) => {
                                        const newInput = {...input, ...obj};
                                        onSave(index, newInput)
                                    }}/>
                <SatoshiInput {...this.getInputProps("Value, Satoshi", "value")}/>
            </HidingCard>
        )
    }
}

export default InputBlock;