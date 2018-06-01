import React from 'react'
import dataToSequence from "./dataToSequence";
import md5 from "crypto-js/md5";
import T from "../T";

const errorView = (err) => {
    return <span>{'<'}<T>{err}</T>{'>'}</span>
};

const renderElement = ({ key, valid, name, view, value }) => {
    return (
        <p key={key} className={!valid ? 'text-danger' : ''}>
            <span className={!valid ? 'text-danger' : 'text-muted'}><T>{name}</T>: </span>{view || value}
        </p>
    )
};

const renderError = () => {
    return (
        <div className="alert alert-danger">
            <strong className="text-danger">
                <T>Present invalid fields</T>. <T>You can create transaction in manual mode</T>.
            </strong>
        </div>
    )
};

const renderComplexElement = ({ name, items, dataForm, view, num, test }) => {
    const props = {};
    const keys = [];
    items.forEach(i => {
        keys.push(i.key);
        const data = dataForm[i.key];
        if (data) {
            props[i.name] = data.value;
        } else if (i.required) {
            props[i.name] = undefined;
        }
    });
    if (Object.keys(props).length) {
        const value = view(props);
        const cKey = md5(keys.join(''));
        return renderElement({ key: cKey, valid: test(value), value , name})
    } else {
        return null
    }
};

class FilledTransactionForm extends React.Component {

    componentWillMount() {
        const sequence = dataToSequence(this.props.trx);
        const error = sequence.reduce((p, c) => p || c.err, false);
        this.setState({ sequence, error })
    }

    render() {
        const { trx } = this.props;
        const { sequence, error } = this.state;
        // TODO: delete
        return (
            <React.Fragment>
                { error || trx.error ? renderError() : null }
                { sequence.map(e =>
                    {
                        if (typeof e === 'string') {
                            const data = trx.dataForm[e];
                            if (data) {
                                return renderElement({key: e, ...data})
                            } else {
                                return null
                            }
                        } else {
                            const { name, num, items, err } = e;
                            if (err) {
                                return renderElement({valid: false, view: errorView(err), ...e})
                            }
                            else {
                                if (items) {
                                    return renderComplexElement({...e, dataForm: trx.dataForm})
                                } else {
                                    const key = `${name}#${num ? num : ''}`;
                                    return <h3 key={key}><T>{name}</T> {num !== null ? num : ''}</h3>
                                }
                            }
                        }
                    })
                }
            </React.Fragment>
        )
    }
}

export default FilledTransactionForm;