import React from 'react';
import Card from "./Card";


const Menu = (props) => {
    return (
        <Card>
            <div className="MenuWrapper">
                {props.children}
            </div>
        </Card>
    )
};

export default Menu;