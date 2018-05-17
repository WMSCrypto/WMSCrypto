import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step from "../Step";
import { setCurrentStepResult} from "../../core/actions/stepsActions";
import define from "../../core/define";
import { generateMnemonics } from '../../core/crypto';

const steps = define.steps;


const mapStateToProps = (state) => {
    return {
        result: state.steps.results[steps.generateMnemonics],
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

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        const { current, result } = this.props;
        if (current === steps.generateMnemonics && !result) {
            this.props.setResult(generateMnemonics())
        }
    }

    render() {
        const { next, result } = this.props;
        return (
            <Step name={steps.generateMnemonics}
                  next={next}
                  displayName="Generate mnemonics">
                <p>{ result }</p>
            </Step>
        )
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(MnemonicsList);

