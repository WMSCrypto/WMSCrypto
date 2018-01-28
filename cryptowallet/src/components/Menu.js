import React from 'react';
import Card from "./Card";


const Menu = (props) => {
    return (
        <div className="MenuWrapper">
            <div>
                {props.children}
            </div>
        </div>
    )
};

export default Menu;