import React from 'react';
import bs58check from 'bs58check';
import BaseInput from "./BaseInput";

class Base58Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }

    onSet(v) {
        try {
            bs58check.decode(v);
            this.props.onSet(v);
            this.setState({errorMessage: ''})
        } catch (e) {
            this.props.onSet(v);
            this.setState({errorMessage: e.message})
        }
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <BaseInput {...this.props}
                       onSet={v => {this.onSet(v)}}
                       invalid={!!errorMessage}>
                <small className="text-danger">{ errorMessage }</small>
            </BaseInput>
        )
    }
}

export default Base58Input;