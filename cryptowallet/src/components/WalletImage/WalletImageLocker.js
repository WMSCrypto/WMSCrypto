import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/WalletImageLocker.css';
import { decryptSeedWithCheckAnchor } from "../../utils";
import { t } from "../../utils/translate";

class WalletImageLocker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unlock: false,
            error: false,
            password: '',
        };
        this._unlock = this._unlock.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            error: false
        })
    }

    _unlock() {
        const { password } = this.state;
        const [error, seed] = decryptSeedWithCheckAnchor(this.props.encryptedString, password);
        if (!error) {
            this.setState({unlock: true}, this.props.onUnlock(seed))
        } else {
            this.setState({error})
        }
    }

    _renderPassworInput() {
        const { error, password } = this.state;
        return (
            <div className="form-group">
                <input type="password"
                       className="form-control"
                       value={password}
                       placeholder={t('Input password')}
                       onChange={(e) => this.setState({password: e.target.value})}/>
                <p>{error ? <small className="text-danger">{t(error)}</small> : ' '}</p>
                <div>
                    <button className="btn btn-primary" onClick={this._unlock} disabled={!password}>
                        {t("Unlock")}
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const { rawImage } = this.props;
        if (!rawImage) {
            return null
        }

        const { unlock } = this.state;
        return (
            <div>
                <div className="IdenticonImageWrapper">
                    <div className="IdenticonImage" style={{backgroundImage: `url(${rawImage})`}}/>
                    <p className={`text-${unlock ? 'primary' : 'danger'}`}>{t(unlock ? 'Unlocked' : 'Locked')}</p>
                </div>
                {!unlock ? this._renderPassworInput() : null}
            </div>
        )
    }
}

WalletImageLocker.propTypes = {
    onUnlock: PropTypes.func.isRequired,
    rawImage: PropTypes.string.isRequired
};

export default WalletImageLocker;