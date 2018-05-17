import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step from "../Step";
import { setCurrentStepResult} from "../../core/actions/stepsActions";
import define from "../../core/define";
import { generateSeed } from '../../core/crypto';

const steps = define.steps;


const mapStateToProps = (state) => {
    return {
        result: state.steps.results[steps.generateMnemonics],
        password: state.steps.results[steps.createPassword],
        current: state.steps.current
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        setResult: (result) => {
            dispatch(setCurrentStepResult(result))
        },
    }
};

class MnemonicsList extends Component {

    componentDidUpdate(prevProps, prevState) {
        const { current, result, password } = this.props;
        if (current === steps.generateMnemonics && !result) {
            this.props.setResult(generateSeed(password))
        }
    }

    render() {
        const { next, result } = this.props;
        return (
            <Step name={steps.generateMnemonics}
                  next={next}
                  displayName="Generate mnemonics">
                <p>{ result && result.mnemonics }</p>
            </Step>
        )
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(MnemonicsList);

