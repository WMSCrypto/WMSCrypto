import React, { Component } from 'react';
import Card from "./Cards/Card";

import { t } from '../utils/translate';

class LastStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approve: props.approve || null,
        }
    }

    render() {
        const { hide, important, title, onClick, message, approveCallback } = this.props;
        const { approve } = this.state;
        return (
            <Card hide={hide}>
                {important ? <h3 className="text-danger">IMPORTANT!</h3> : null}
                <p className="text-muted">{message}</p>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           id="checkImportant"
                           checked={approve}
                           onChange={() => this.setState({approve: !approve}, () => approveCallback && approveCallback(!approve))}/>
                    <label className="form-check-label" htmlFor="checkImportant">{t('I understand')}</label>
                </div>
                <br/>
                {approve
                    ? <button type="button" className="btn btn-danger" onClick={onClick}>{title}</button>
                    : <button type="button" className="btn btn-outline-danger" disabled>{title}</button>
                }
                {this.props.children}
            </Card>
        )
    }
}

export default LastStep;
