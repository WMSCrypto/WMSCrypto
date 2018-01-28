import React from 'react';


const ICONS = {
    'visibility': '/images/ic_visibility_black_24px.svg',
    'visibility off': '/images/ic_visibility_off_black_24px.svg'
};


const Icon = (props) => {
    const { size, icon, onClick } = props;
    return (
        <div className="Icon"
             onClick={onClick}
             style={{
                width: size,
                height: size,
                backgroundImage: `url(${ICONS[icon]})`
        }}/>
    )
};

export default Icon;