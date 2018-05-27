import React from 'react'
import dataToSequence from "./dataToSequence";
import T from "../T";

const renderElement = ({ key, valid, name, view, value }) => {
    return (
        <p key={key} className={!valid ? 'text-danger' : ''}>
            <span className={!valid ? 'text-danger' : 'text-muted'}><T>{name}</T>: </span>{view || value}
        </p>
    )
};

const renderComplexElement = ({ name, items, dataForm, view, num }) => {
    const props = {};
    items.forEach(i => {
        const data = dataForm[i.key];
        if (data && data.valid) {
            props[i.name] = data.value;
        } else {
            return renderElement({ key: `err-${i.name}`, valid: false, name, view: <T>Invalid complex component</T> })
        }
    });
    return renderElement({ key: `#${num || ''}-complex-${name}`, valid: true, view: view(props), name})
};

class FilledTransactionForm extends React.Component {
    render() {
        const { trx } = this.props;
        const sequence = dataToSequence(trx);
        console.log(sequence)
        return (
            <React.Fragment>
                {sequence.map(e => {
                    if (typeof e === 'string') {
                        const data = trx.dataForm[e];
                        if (data) {
                            return renderElement({key: e, ...data})
                        }
                    } else {
                        const { name, num, items, view } = e;
                        if (items) {
                            return renderComplexElement({
                                name, num, items, view, dataForm: trx.dataForm
                            })
                        } else {
                            const key = `${name}#${num ? num : ''}`;
                            return <h3 key={key}><T>{name}</T> {num !== null ? num : ''}</h3>
                        }
                    }
                })}
            </React.Fragment>
        )
    }
}

export default FilledTransactionForm;