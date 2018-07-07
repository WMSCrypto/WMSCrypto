import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import PasswordInput from "./PasswordInput";
import define from "../core/define";
import stepWrapper from '../core/stepWrapper';

const PASSWORD_LENGTH = 8;

const validatePassword = (password, isEN) => {

    const passwordLength = password.length <= PASSWORD_LENGTH ? 'Password length must be more 8 symbols.' : '';
    let messages, score;
    if (isEN) {
        const check = zxcvbn(password);
        const { warning, suggestions } = check.feedback;
        messages = [
            warning,
            ...suggestions,
            ...[passwordLength]
        ];
        score = check.score;
    } else {
        messages = [passwordLength];
        score = null;
    }
    return {messages, score}
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
            if (define.debug) {
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
        const isEN = /^[0-9a-zA-Z!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(password);
        const { messages: validateMessages, score } = password && validatePassword(password, isEN);
        let messageIfValid;
        if (score !== null) {
            messageIfValid = `Password match. Score of strength password is ${score} or 4`;
        } else {
            messageIfValid = "Password match. Score of strength password not available, because using not english chars, not digits or not !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~'"
        }
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
                               validMessage={messageIfValid}
                               id="repeatPasswordInput"/>
                {children || null}
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.createPassword)(CreatePassword);
