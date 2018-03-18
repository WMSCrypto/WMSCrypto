import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/WalletImageLocker.css';
import { decryptSeedWithCheckAnchor } from "../../utils";
import { t } from "../../utils/translate";
import {getIdenticonSVG} from "../../utils/jdenticon";

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

    componentWillReceiveProps(newProps) {
        if (newProps.encryptedString !== this.props.encryptedString) {
            this.setState({
                error: false
            })
        }
    }

    _unlock() {
        const { password } = this.state;
        const [error, seed] = decryptSeedWithCheckAnchor(this.props.encryptedString, password);
        if (!error) {
            this.setState({unlock: true, seed: seed}, this.props.onUnlock(seed))
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
        const { encryptedString, seed } = this.props;
        if (!encryptedString) {
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
                    <p className={`text-${unlock ? 'primary' : 'danger'}`}>{t(unlock ? 'Unlocked' : 'Locked')}</p>
                </div>
                {!unlock ? this._renderPassworInput() : null}
            </div>
        )
    }
}

WalletImageLocker.propTypes = {
    onUnlock: PropTypes.func.isRequired,
    encryptedString: PropTypes.string,
    seed: PropTypes.string
};

export default WalletImageLocker;