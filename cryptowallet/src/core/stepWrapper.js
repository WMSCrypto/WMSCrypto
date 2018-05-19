import React from 'react';
import { connect } from 'react-redux';
import { addStep, nextStep, previousStep, setCurrentStepResult } from "./actions/stepsActions";
import PreviousButton from "../components/buttons/PreviousButton";
import NextButton from "../components/buttons/NextButton";
import T from "../components/T";
import Card from "../components/Cards/Card";
import StepIndicator from "../components/steps/StepIndicator";

const getStepResultFunc = (components) => {
    return (step) => components[step.name] ? components[step.name].result : null;
};

const mapStateToProps = (state) => {
    return {
        steps: state.steps
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        nextStep: (next) => {
            dispatch(nextStep(next))
        },
        previousStep: () => {
            dispatch(previousStep())
        },
        addStep: (props) => {
            dispatch(addStep(props))
        },
        setResult: (result) => {
            dispatch(setCurrentStepResult(result))
        }
    }
};


export default (step) => (WrappedComponent) => {
    return connect(mapStateToProps, mapPropsToDispatch)(class extends React.Component {

        _checkNeedAddStep() {
            const { first, steps } = this.props;
            const { name } = step;
            if (first && Object.keys(steps.components).length === 0) {
                this.props.nextStep(name)
            }
        }

        componentWillMount() {
            this._checkNeedAddStep()
        }

        componentDidUpdate(prevProps, prevState, snapShot) {
            this._checkNeedAddStep(prevProps.steps.current)
        }

        render() {
            const { name, display } = step;
            const { current, components } = this.props.steps;
            const { controls=true, next, nextStep, previousStep } = this.props;
            const component = components[name];
            if (current === name && components[name]) {
                const { result, previous } = component;
                return (
                    <Card title={<T>{display}</T>} blankString={false}>
                        <WrappedComponent {...this.props}
                                          getStepResult={getStepResultFunc(components)}
                                          result={result}
                                          name={name}/>
                        <div className="Step_controls">
                            {controls && previous ? <PreviousButton onClick={() => previousStep()}
                                                                    disabled={!previous}/> : null}
                            {controls && next ? <NextButton onClick={() => nextStep(next.name)}
                                                            disabled={!result}/> : null}
                        </div>
                    </Card>
                )
            } else {
                return (
                    <StepIndicator result={component && component.result}>
                        <h5 className="Step__close">
                            <T>{display}</T>
                        </h5>
                    </StepIndicator>
                )
            }
        }
    })
}