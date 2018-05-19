import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import PasswordInput from "./PasswordInput";
import define from "../core/define";
import stepWrapper from '../core/stepWrapper';

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

const getInitialState = ({ result }) => {
    return {
        password: result || '',
        passwordRepeat: result || '',
    }
};

class CreatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = getInitialState(props)
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
            const bothPasswordsExists = password && passwordRepeat;
            if (bothPasswordsExists && password === passwordRepeat && strong) {
                setResult(password);
            } else {
                setResult(null)
            }
        })
    }

    render() {
        const { password, passwordRepeat } = this.state;
        const { children, result } = this.props;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        return (
            <React.Fragment>
                <PasswordInput label="New password"
                               placeholder=""
                               onChange={(e) => this.onChange({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={result}
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
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.createPassword)(CreatePassword);
