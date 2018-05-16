import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import Card from "./Cards/Card";
import PasswordInput from "./PasswordInput";
import Step from "./Step";

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

class CreatePassword extends Component {

    constructor(props) {
        super(props);
        this.state ={
            password: '',
            passwordRepeat: '',
        }
    }

    onChange(obj) {
        const { setPassword } = this.props;
        this.setState(obj, () => {
            const { password, passwordRepeat } = this.state;
            let strong;
            if (DEV_MODE) {
                strong = true;
            } else {
                strong = password.length > PASSWORD_LENGTH && !validatePassword(password).join("").length;
            }
            if (password === passwordRepeat) {
                setPassword(strong ? password : null);
            }
            if (password && passwordRepeat && password !== passwordRepeat) {
                setPassword(null);
            }
        })

    }

    render() {
        const { password, passwordRepeat } = this.state;
        const { children, disabled, first, next } = this.props;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        const inputAttrs = disabled ? {disabled: true} : {};
        return (
            <Step name="createPassword" first={first} next={next} displayName={"Create password"}>
                <PasswordInput label="New password"
                               placeholder=""
                               onChange={(e) => this.onChange({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={passwordStepApprove}
                               id="inputPassword"
                               inputAttrs={inputAttrs}/>
                <PasswordInput label="Repeat new password"
                               placeholder=""
                               value={passwordRepeat}
                               onChange={(e) => this.onChange({passwordRepeat: e.target.value})}
                               messages={notMatch && ['Passwords not matched']}
                               invalid={notMatch}
                               valid={passwordStepApprove}
                               validMessage={'Passwords match and have strong security.'}
                               id="repeatPasswordInput"
                               inputAttrs={inputAttrs}/>
                {children || null}
            </Step>
        )
    }
}

export default CreatePassword;
