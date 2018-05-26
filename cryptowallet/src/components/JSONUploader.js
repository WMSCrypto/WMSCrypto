import React, { Component } from 'react';
import T from "./T";


class JSONUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invalidMessage: null
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const { onValid, requiredKeys=[] } = this.props;
            try {
                const data = JSON.parse(event.target.result);
                requiredKeys.forEach(k => {
                    if (data[k] === undefined) {
                        throw new Error();
                    }
                });
                this.setState({invalidMessage: null}, onValid(data))
            } catch (e) {
                this.setState({invalidMessage: 'File is not json or invalid'}, onValid(null))
            }
        };
        reader.readAsText(file)
    }

    render() {
        const { disabled=false } = this.props;
        const { invalidMessage } = this.state;
        return (
            <div className="form-group" style={{overflow: 'hidden'}}>
                <input type="file"
                       className="form-control-file"
                       onChange={this.onChange}
                       disabled={disabled}
                       accept="application/json"/>
                {invalidMessage
                    ? <small className="text-danger"><T>{invalidMessage}</T></small>
                    : null
                }
            </div>
        )
    }
}

export default JSONUploader;