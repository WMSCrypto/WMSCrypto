import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from "./Cards/Card";
import { nextStep, previousStep, addStep } from "../core/actions/stepsActions";
import T from "./T";
import NextButton from "./buttons/NextButton";
import PreviousButton from "./buttons/PreviousButton";

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
    }
};

class Step extends Component {

    componentWillMount() {
        if (this.props.first) {
            this.props.nextStep(this.props.name)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { list, current, name } = this.props;
        const lastIndex = list.length - 1;
        /*
        if we set current element as with component property name, next check if we not added this component to list,
        next we check if last element next field as current component property name.
        */
        if (lastIndex < 0 || (name === current && list[lastIndex].name !== name && list[lastIndex].next === name)) {
            this.props.addStep({...this.props, previous: list[lastIndex] && list[lastIndex].name})
        }
    }

    render() {
        const {
            children,
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
                    {children}
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
}

Step.defaultProps = {
    first: false,
    last: false,
    previous: null,
    next: null,
    controls: true,
    initialData: {},
    data: {},
};

Step.propTypes = {
    displayName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    initialData: PropTypes.object,
    first: PropTypes.bool,
    last: PropTypes.bool,
    controls: PropTypes.bool,
};

export default connect(mapStateToProps, mapPropsToDispatch)(Step);