import React, { Component } from 'react';
import Card from "../Cards/Card";
import T from "../T";


class LastStepButton extends Component {

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
                {important ? <h3 className="text-danger"><T>IMPORTANT!</T></h3> : null}
                <p className="text-muted"><T>{message}</T></p>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           id="checkImportant"
                           checked={approve}
                           onChange={() => this.setState({approve: !approve}, () => approveCallback && approveCallback(!approve))}/>
                    <label className="form-check-label" htmlFor="checkImportant">{<T>I understand</T>}</label>
                </div>
                <br/>
                {approve
                    ? <button type="button" className="btn btn-danger" onClick={onClick}><T>{title}</T></button>
                    : <button type="button" className="btn btn-outline-danger" disabled><T>{title}</T></button>
                }
                {this.props.children}
            </Card>
        )
    }
}

export default LastStepButton;
