import React from 'react';
import Card from "./Cards/Card";

class HidingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false}
    }

    render() {
        const { show } = this.state;
        const { onDelete } = this.props;
        return (
            <React.Fragment>
                <Card>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="lead" style={{margin: 0}}>{this.props.title}</p>
                        </div>
                        <div>
                            <button className={`btn btn${show ? '-outline' : ''}-secondary btn-sm`}
                                    onClick={() => {this.setState({show: !show})}}>
                                {show ? 'Hide' : 'Show'}
                            </button>
                            <span> </span>
                            {onDelete
                                ? <button className='btn btn-danger btn-sm'
                                    onClick={() => {onDelete()}}
                                    disabled={!onDelete}>
                                    Delete
                                </button>
                                : null
                            }
                        </div>
                    </div>
                    {show ? this.props.children : null}
                </Card>
                <br/>
            </React.Fragment>
        )
    }
}

export default HidingCard;