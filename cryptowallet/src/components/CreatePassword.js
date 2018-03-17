import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import Card from "./Cards/Card";
import PasswordInput from "./PasswordInput";

import { t } from '../utils/translate';

const PASSWORD_LENGTH = 8;

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [
        warning,
        ...suggestions,
        ...[password.length <= PASSWORD_LENGTH ? t('Password length must be 8 or more.') : '']
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
            // TODO: remove before deploy
            // const strong = password.length > PASSWORD_LENGTH && !validatePassword(password).join("").length;
            const strong = true;
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
        const { children, disabled } = this.props;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        const inputAttrs = disabled ? {disabled: true} : {};
        return (
            <Card>
                <PasswordInput label={t("New password")}
                               placeholder=""
                               onChange={(e) => this.onChange({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={passwordStepApprove}
                               id="inputPassword"
                               inputAttrs={inputAttrs}/>
                <PasswordInput label={t("Repeat new password")}
                               placeholder=""
                               value={passwordRepeat}
                               onChange={(e) => this.onChange({passwordRepeat: e.target.value})}
                               messages={notMatch && [t('Passwords not matched')]}
                               invalid={notMatch}
                               valid={passwordStepApprove}
                               validMessage={t('Passwords match and have strong security.')}
                               id="repeatPasswordInput"
                               inputAttrs={inputAttrs}/>
                {children || null}
            </Card>
        )
    }
}

export default CreatePassword;
