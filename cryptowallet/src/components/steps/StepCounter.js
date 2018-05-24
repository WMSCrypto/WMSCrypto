import React from 'react';
import { connect } from 'react-redux';
import actionTypes from "../../core/actionTypes";

const mapStateToProps = (state) => {
    return {}
};

const mapPropsToDispatch = dispatch => {
    return {
        setStepsCount: (count) => {
            dispatch({
                type: actionTypes.SET_STEPS_COUNT,
                count
            })
        },
    }
};


class StepCounter extends React.Component {

    componentWillMount() {
        // Always add +1 because last element never have next attr.
        let { children } = this.props;
        if (!children.length) {
            children = [children];
        }
        let index = 0;
        let next = children[index].props.next;
        while (next) {
            index++;
            next = children[index].props.next
        }
        this.props.setStepsCount(index + 1)
    }

    render() {
        return this.props.children
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(StepCounter);