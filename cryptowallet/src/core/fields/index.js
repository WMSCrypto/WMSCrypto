import fieldTests from "./fieldsTests";
import fieldViews from "./fieldsViews";
import fieldCreator from "./fieldsCreator";

const getField = ({ fields, fieldsValues, validation, name, index=null}) => {
    const flatName = index !== null ? `${name}:#${index}` : name;
    return {
        valid: validation[flatName],
        value: fieldsValues[flatName],
        exists: fieldsValues[flatName] !== undefined,
        ...fields[name]
    }
};

export {
    fieldTests,
    fieldViews,
    fieldCreator,
    getField
}