import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from "./Cards/Card";
import { nextStep, previousStep, addStep } from "../core/actions/stepsActions";
import T from "./T";


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
        const { list, current } = this.props;
        if (list.length === 0 || list[list.length - 1].next === current) {
            this.props.addStep(this.props)
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
            first,
            last,
            controls
        } = this.props;
        if (current === name) {
            return (
                <Card>
                    {children}
                    {controls && !first ? <button onClick={() => previousStep()}>Previous</button> : null}
                    {controls && !last ? <button onClick={() => nextStep(next)}>Next</button> : null}
                </Card>
            )
        } else {
            return (
                <p>
                    <T>Step</T>: <T>{displayName}</T>
                </p>
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
    result: null
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