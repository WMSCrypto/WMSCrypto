import React from 'react';
import PropTypes from 'prop-types';
import CollapseIcon from "../CollapseIcon";
import './styles/TransactionInputGroupHeader.css';

class TransactionInputGroupHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {collapse: props.collapse};
    }

    render() {
        const { children, title } = this.props;
        const { collapse } = this.state;
        return (
            <div>
                <div className="TransactionInputGroupHeader">
                    <h5><strong>{title}</strong></h5>
                    <div className="TransactionInputGroupHeader controls">
                        <CollapseIcon onClick={() => {this.setState({collapse: !collapse})}}
                                      size={24}
                                      collapse={collapse}/>
                    </div>
                </div>
                {collapse ? null : children}
            </div>
        )
    }
}

TransactionInputGroupHeader.defaultProps = {
    collapse: false,
};

TransactionInputGroupHeader.propTypes = {
    title: PropTypes.any.isRequired,
    collapse: PropTypes.bool,
};

export default TransactionInputGroupHeader;