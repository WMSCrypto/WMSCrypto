import React from 'react';

const save = (obj, id, name) => {
    const str = JSON.stringify(obj);
    const chatBlob = new Blob([str], {type : 'text/plain;charset=utf-8'});
    const downloadBtn = document.getElementById(id);
    downloadBtn.href = URL.createObjectURL(chatBlob);
    downloadBtn.download = `${name}.json`;
};

const DownloadButton = (props) => {
    const { children, obj, id, disabled, name } = props;
    return (
        <div>
            <a id={id}>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!!disabled}
                    onClick={() => {save(obj, id, name)}}>
                {children}
            </button>
            </a>
        </div>
    )
};

export default DownloadButton;