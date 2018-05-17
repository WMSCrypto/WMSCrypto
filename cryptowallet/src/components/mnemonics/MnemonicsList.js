import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step from "../Step";
import { setCurrentStepResult} from "../../core/actions/stepsActions";
import define from "../../core/define";

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
        this.state = {
            mnemonics: 'aaa'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { current } = this.props;
        if (current === steps.generateMnemonics) {
            this.props.setResult(this.state.mnemonics)

        }
    }

    render() {
        const { next } = this.props;
        return (
            <Step name={steps.generateMnemonics}
                  next={next}
                  displayName="Generate mnemonics">
                <p>Mnemonics</p>
            </Step>
        )
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(MnemonicsList);

