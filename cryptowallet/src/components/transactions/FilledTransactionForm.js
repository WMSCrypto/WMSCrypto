import React from 'react'
import dataToSequence from "./dataToSequence";
import T from "../T";


class FilledTransactionForm extends React.Component {
    render() {
        const { trx } = this.props;
        const sequence = dataToSequence(trx);
        return (
            <React.Fragment>
                {sequence.map(e => {
                    if (typeof e === 'string') {
                        const data = trx.dataForm[e];
                        return (
                            <p key={e} className={!data.valid ? 'text-danger' : ''}>
                                <span className="text-muted"><T>{data.name}</T>: </span>{data.view || data.value}
                            </p>
                        )
                    } else {
                        const { name, num } = e;
                        const key = `${name}#${num ? num : ''}`;
                        return <h3 key={key}><T>{name}</T> {num !== null ? num : ''}</h3>
                    }
                })}
            </React.Fragment>
        )
    }
}

export default FilledTransactionForm;