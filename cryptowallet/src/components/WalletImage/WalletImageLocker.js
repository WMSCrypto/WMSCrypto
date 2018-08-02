import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/WalletImageLocker.css';
import { getIdenticonSVG } from "../../utils/jdenticon";
import { ENCRYPTED_BY_ANCHOR, ENCRYPTED_WITHOUT_ANCHOR} from "../../assets/messages";
import { decryptSeed } from "../../core/crypto";
import T from "../T";
import TextInput from "../inputs/TextInput";
import {TG_LINK} from "../../utils";

const Error = ({ error }) => {
    switch (error) {
        case ENCRYPTED_BY_ANCHOR:
            return (
                <small className="text-danger">
                    <T>{`${ENCRYPTED_BY_ANCHOR}_1`}</T>{' '}
                </small>
            );
        case ENCRYPTED_WITHOUT_ANCHOR:
            return (
                <small className="text-danger">
                    <T>{`${ENCRYPTED_WITHOUT_ANCHOR}_1`}</T>{' '}
                    <a href={TG_LINK}>@WMSCrypto</a>{' '}
                    <T>{`${ENCRYPTED_WITHOUT_ANCHOR}_2`}</T>
                </small>
            );
        default:
            return <small className="text-danger"><T>{error}</T></small>
    }
};

class WalletImageLocker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unlock: !!props.seed || false ,
            error: false,
            password: '',
        };
        this._unlock = this._unlock.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.encryptedString !== this.props.encryptedString) {
            const [error, _] = decryptSeed(newProps.encryptedString, '', newProps.anchor)
            this.setState({
                error: error === 'Invalid anchor' ? error : false
            })
        }
    }

    _unlock() {
        const { password } = this.state;
        const { anchor } = this.props;
        const [error, seed] = decryptSeed(this.props.encryptedString, password, anchor);
        if (!error) {
            this.setState({unlock: true, seed: seed}, this.props.onUnlock(seed))
        } else {
            this.setState({error})
        }
    }

    _renderPasswordInput() {
        const { error, password } = this.state;
        return (
            <div className="form-group">
                <TextInput type="password"
                           className="form-control"
                           value={password}
                           onChange={(e) => this.setState({password: e.target.value})}/>
                <p>{error ? <Error error={error}/> : ' '}</p>
                <div>
                    <button className="btn btn-primary" onClick={this._unlock} disabled={!password}>
                        <T>Unlock</T>
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const { encryptedString, seed, warningUpdate } = this.props;
        if (!encryptedString && !seed) {
            return null
        }

        const { unlock } = this.state;
        let image = 'none';
        if (seed) {
            image = `url(data:image/svg+xml;base64,${window.btoa(getIdenticonSVG({seed}))})`
        }
        return (
            <div>
                <div className="IdenticonImageWrapper">
                    <div className="IdenticonImage" style={{backgroundImage: image}}>
                        {!unlock ? <div><span className="text-danger">?</span></div> : null}
                    </div>
                    <p className={`text-${unlock ? 'primary' : 'danger'}`}>
                        <T>{unlock ? 'Unlocked' : 'Locked'}</T>
                    </p>
                    {unlock && (warningUpdate && encryptedString && parseInt(encryptedString.slice(-2)) < 3) ? <T>__UPDATE_QR</T> : null}
                </div>
                {!unlock ? this._renderPasswordInput() : null}
            </div>
        )
    }
}

WalletImageLocker.propTypes = {
    onUnlock: PropTypes.func.isRequired,
    encryptedString: PropTypes.string,
    seed: PropTypes.string,
    anchor: PropTypes.object,
    warningUpdate: PropTypes.bool
};

export default WalletImageLocker;