import React from 'react'

class TextInput extends React.Component {

    render() {
        return (
            <input ref="inputRef"
                   onKeyPress={(e) => {if (e.key === 'Enter') {this.refs.inputRef.blur()}}}
                   {...this.props}/>
        )
    }
}

export default TextInput;