import React from 'react';
import { connect } from 'react-redux';
import { addStep, nextStep, previousStep, setCurrentStepResult } from "./actions/stepsActions";
import PreviousButton from "../components/buttons/PreviousButton";
import NextButton from "../components/buttons/NextButton";
import T from "../components/T";
import Card from "../components/Cards/Card";
import StepIndicator from "../components/steps/StepIndicator";
import {saveOperationResult} from "./actions/operationActions";

const getStepResultFunc = (components) => {
    return (step) => components[step.name] ? components[step.name].result : null;
};

const mapStateToProps = (state) => {
    return {
        steps: state.steps,
        online: state.common.uuid
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
        },
        saveOperationResult: (uuid, data) => {
            dispatch(saveOperationResult(uuid, data))
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
            const { onlyOnline, online } = this.props;
            if (onlyOnline && !online) {
                return null
            }
            const { name, display } = step;
            const { current, components, count, stepNumber } = this.props.steps;
            const { controls=true, next, nextStep, previousStep, last=false } = this.props;
            const component = components[name];
            if (current === name && component && !(last && component.result)) {
                const { result, previous } = component;
                return (
                    <Card title={<StepIndicator display={display} count={count} stepNumber={stepNumber}/>}
                          blankString={false}>
                        <hr/>
                        <WrappedComponent {...this.props}
                                          getStepResult={getStepResultFunc(components)}
                                          result={result}
                                          name={name}
                                          uuid={online}/>
                        <div className="Step_controls">
                            {controls && previous ? <PreviousButton onClick={() => previousStep()}
                                                                    disabled={!previous}/> : null}
                            {controls && next && !last ? <NextButton onClick={() => nextStep(next.name)}
                                                                     disabled={!result}/> : null}
                        </div>
                    </Card>
                )
            } else {
                return null
            }
        }
    })
}