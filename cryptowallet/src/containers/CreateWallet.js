import React, { Component } from 'react';
import PasswordInput from '../components/PasswordInput';
import zxcvbn from 'zxcvbn';

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [warning, ...suggestions];
};


class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordRepeat: '',
            mnemonics: []
        };
    }

    render() {
        const { password, passwordRepeat, mnemonics } = this.state;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        return (
            <div>
                <PasswordInput label="Password"
                               placeholder="Enter password"
                               onChange={(e) => this.setState({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={passwordStepApprove}
                               id="inputPassword"/>
                <PasswordInput label="Repeat password"
                               placeholder="Repeat password"
                               value={passwordRepeat}
                               onChange={(e) => this.setState({passwordRepeat: e.target.value})}
                               messages={notMatch && ['Passwords not matched']}
                               invalid={notMatch}
                               valid={passwordStepApprove}
                               id="repeatPasswordInput"/>
            </div>
        )

    }
}

export default CreateWallet;