import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import Card from "./Card";
import PasswordInput from "./PasswordInput";

const VALID_PASSWORD_MESSAGE = 'Passwords match and have strong security.';

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [warning, ...suggestions];
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
            if (password === passwordRepeat) {
                setPassword(password);
            }
            if (password && passwordRepeat && password !== passwordRepeat) {
                setPassword(null);
            }
        })

    }

    render() {
        const { password, passwordRepeat } = this.state;
        const { children, disabled } = this.props;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        const inputAttrs = disabled ? {disabled: true} : {};
        return (
            <Card>
                <PasswordInput label="New password"
                               placeholder="Enter password"
                               onChange={(e) => this.onChange({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={passwordStepApprove}
                               id="inputPassword"
                               inputAttrs={inputAttrs}/>
                <PasswordInput label="Repeat new password"
                               placeholder="Repeat password"
                               value={passwordRepeat}
                               onChange={(e) => this.onChange({passwordRepeat: e.target.value})}
                               messages={notMatch && ['Passwords not matched']}
                               invalid={notMatch}
                               valid={passwordStepApprove}
                               validMessage={VALID_PASSWORD_MESSAGE}
                               id="repeatPasswordInput"
                               inputAttrs={inputAttrs}/>
                {children || null}
            </Card>
        )
    }
}

export default CreatePassword;