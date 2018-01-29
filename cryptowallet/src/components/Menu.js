import React from 'react';

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