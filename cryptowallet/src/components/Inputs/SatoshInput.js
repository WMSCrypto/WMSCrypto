import React from 'react';
import IntegerInput from "./IntegerInput";
import BaseInput from "./BaseInput";

class SatoshiInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inValue: props.value !== '' ? (Math.pow(10, -8) * props.value) : ''
        }
    }

    render() {
        const { inValue } = this.state;
        return (
            <BaseInput {...this.props}
                       placeholder="0.0"
                       value={inValue}
                       onSet={(v) => {
                           this.setState({inValue: v}, () => {
                                const newValue = v !== '' ? parseInt(Math.pow(10, 8) * v, 10) : '';
                                this.props.onSet(newValue)
                           })
                       }}
                       testFunc = {(v) => /^\d+\.{0,1}\d{0,8}$/.test(v)}>
                {this.props.children}
            </BaseInput>
        )
    }
}

export default SatoshiInput;