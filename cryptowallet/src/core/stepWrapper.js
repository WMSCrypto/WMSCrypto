import React from 'react';
import { connect } from 'react-redux';
import { addStep, nextStep, previousStep, setCurrentStepResult } from "./actions/stepsActions";
import PreviousButton from "../components/buttons/PreviousButton";
import NextButton from "../components/buttons/NextButton";
import T from "../components/T";
import Card from "../components/Cards/Card";

const mapStateToProps = (state) => {
    return {
        ...state.steps
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

export default (WrappedComponent) => {
    return connect(mapStateToProps, mapPropsToDispatch)(class extends React.Component {

        componentWillMount() {

        }

        componentDidUpdate(prevProps, prevState) {

        }

        render() {
            const {
                current,
                displayName,
                name,
                nextStep,
                previousStep,
                next,
                results,
                previous,
                first,
                last,
                controls,
            } = this.props;
            if (current === name) {
                return (
                    <Card title={<T>{displayName}</T>} blankString={false}>
                        <WrappedComponent {...this.props}/>
                        <div className="Step_controls">
                        {controls && !first
                            ? <PreviousButton onClick={() => previousStep()} disabled={previous}/>
                            : null
                        }
                        {controls && !last
                            ? <NextButton onClick={() => nextStep(next)} disabled={!results[name]}/>
                            : null
                        }
                        </div>
                    </Card>
                )
            } else {
                return (
                    <h5 className="Step__close">
                        <T>Step</T>: <T>{displayName}</T>
                    </h5>
                )
            }
        }
    })
}