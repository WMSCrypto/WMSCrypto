import React from 'react';
import Card from "./Card";

const ResultCard = (props) => {
    return (
        <Card>
            <h5 className="card-title">{props.title}</h5>
            {props.children}
        </Card>
    )
};

export default ResultCard;