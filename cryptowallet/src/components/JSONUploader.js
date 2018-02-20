import React, { Component } from 'react';


class JSONUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invalidMessage: null
        }
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
                this.setState({invalidMessage: 'File is not json or invalid'})
            }
        };
        reader.readAsText(file)
    }

    render() {
        const { title, disabled=false } = this.props;
        const { invalidMessage } = this.state;
        return (
            <div className="form-group" style={{overflow: 'hidden'}}>
                <label htmlFor="mnemonicsInput">{title}</label>
                <input type="file"
                       className="form-control-file"
                       id="mnemonicsInput" onChange={(e) => {this.onChange(e)}}
                       disabled={disabled}/>
                {invalidMessage
                    ? <small className="text-danger">{invalidMessage}</small>
                    : null
                }
            </div>
        )
    }
}

export default JSONUploader;