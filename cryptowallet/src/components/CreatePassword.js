import React, { Component } from 'react';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';
import PasswordInput from "./PasswordInput";
import Step from "./Step";
import { setCurrentStepResult} from "../core/actions/stepsActions";

const PASSWORD_LENGTH = 8;
const DEV_MODE = process.env.NODE_ENV === 'development';

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [
        warning,
        ...suggestions,
        ...[password.length <= PASSWORD_LENGTH ? 'Password length must be 8 or more.' : '']
    ];
};

const mapStateToProps = (state) => {
    return {
        result: state.steps.results['createPassword']
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        setResult: (result) => {
            dispatch(setCurrentStepResult(result))
        },
    }
};

const initialState = {
    password: '',
    passwordRepeat: '',
};

class CreatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }

    componentDidUpdate(prevProps, prevState) {
        const { result } = this.props;
        const { password, passwordRepeat } = this.state;
        if (password === passwordRepeat && (!result && prevProps.result)) {
            this.setState(initialState)
        }
    }

    onChange(obj) {
        const { setResult } = this.props;
        this.setState(obj, () => {
            const { password, passwordRepeat } = this.state;
            let strong;
            if (DEV_MODE) {
                strong = true;
            } else {
                strong = password.length > PASSWORD_LENGTH && !validatePassword(password).join("").length;
            }
            if (password === passwordRepeat) {
                setResult(strong ? password : null);
            }
            const bothPasswordsExists = password && passwordRepeat;
            if (!bothPasswordsExists || (bothPasswordsExists && password !== passwordRepeat)) {
                setResult(null);
            }
        })

    }

    render() {
        const { password, passwordRepeat } = this.state;
        const { children, first, next, result } = this.props;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        return (
            <Step name="createPassword"
                  first={first}
                  next={next}
                  displayName={"Create password"}>
                <PasswordInput label="New password"
                               placeholder=""
                               onChange={(e) => this.onChange({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={next}
                               id="inputPassword"/>
                <PasswordInput label="Repeat new password"
                               placeholder=""
                               value={passwordRepeat}
                               onChange={(e) => this.onChange({passwordRepeat: e.target.value})}
                               messages={notMatch && ['Passwords not matched']}
                               invalid={notMatch}
                               valid={result}
                               validMessage={'Passwords match and have strong security.'}
                               id="repeatPasswordInput"/>
                {children || null}
            </Step>
        )
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(CreatePassword);
