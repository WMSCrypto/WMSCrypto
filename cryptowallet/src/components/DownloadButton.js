import React from 'react';
import sha256 from "crypto-js/sha256";

const save = (obj, id) => {
    const str = JSON.stringify(obj);
    const chatBlob = new Blob([str], {type : 'text/plain;charset=utf-8'});
    const downloadBtn = document.getElementById(id);
    downloadBtn.href = URL.createObjectURL(chatBlob);
    downloadBtn.download = `${sha256(str).toString()}.json`;
};

const DownloadButton = (props) => {
    const { title, obj, id } = props;
    return (
        <div>
            <a href="javascript:void(0)" id={id}>
            <button type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {save(obj, id)}}>
                {title}
            </button>
            </a>
        </div>
    )
};

export default DownloadButton;