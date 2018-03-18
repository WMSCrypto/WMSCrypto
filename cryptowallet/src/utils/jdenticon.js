import sha256 from 'crypto-js/sha256';
import jdenticon from 'jdenticon';


const DEFAULT_SIZE = 400;

const getIdenticonSVG = ({ seed=null, size=DEFAULT_SIZE }) => {
    const hashString = sha256(seed).toString();
    return jdenticon.toSvg(hashString, size)
};

export {
    getIdenticonSVG
}
