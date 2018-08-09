import React from 'react';

const AppVersion = () => {
    return (
        <div className="version">
            <small>
                {process.env.WMS_VERSION ? `version ${process.env.WMS_VERSION}` : 'development mode'}
            </small>
        </div>
    )
};

export default AppVersion;