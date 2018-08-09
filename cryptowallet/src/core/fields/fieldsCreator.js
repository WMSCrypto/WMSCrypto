const _sameFunc = (v) => v;
const _trueFunc = () => true;

/**
 * This create field for handled data, with default func.
 * @param {string} name - Using for display field name (translated).
 * @param {int|float|string} def - Default value when we create input.
 * @param {function} fTest=_trueFunc - Need for validate field is valid.
 * @param {function} iTest=_trueFunc - Need for validate inputs values is valid.
 * @param {function} fView=_sameFunc - This is need because value must have another client
 * view, this is using when for filled.
 * @param {function} iView=_sameFunc - This is need because value must have another client
 * view, this is using when create in manual mode.
 * @param {function} iTransform=_sameFunc - Need for transform input to value.
 *
 * @return {object} field - This returns object that have data, for validate, change view,
 * transform input for fields or inputs.
 *
 */

const fieldsCreator = (
    {
        name, def = '',
        fTest = _trueFunc, iTest = _trueFunc,
        fView = _sameFunc, iView = _sameFunc,
        iTransform = _sameFunc
    }) => {
    return {
        name,
        def,
        test: {
            field: fTest,
            input: iTest
        },
        view: {
            field: fView,
            input: iView
        },
        transform: {
            input: iTransform
        }
    }
};

export default fieldsCreator;