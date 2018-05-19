import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step from "./Step";
import { setCurrentStepResult} from "../core/actions/stepsActions";
import define from "../core/define";
import WalletImageGenerator from "./WalletImage/WalletImageGenerator";

const steps = define.steps;


const mapStateToProps = (state) => {
    return {
        result: state.steps.results[steps.image],
        seed: state.steps.results[steps.generateMnemonics],
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

class CreateImage extends Component {

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const { next, result, seed } = this.props;
        return (
            <Step name={steps.image}
                  next={next}
                  displayName="Generate image">
                { seed ? <WalletImageGenerator seed={seed}/> : null}
            </Step>
        )
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(CreateImage);
