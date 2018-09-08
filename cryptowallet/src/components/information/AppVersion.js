import React from 'react';
import define from '../../core/define'

const AppVersion = () => {
    return (
        <div className="version">
            {
                define.wms_version && define.offline
                    ? <small>{`version ${process.env.WMS_VERSION}`}</small>
                    :null
            }
        </div>
    )
};

export default AppVersion;