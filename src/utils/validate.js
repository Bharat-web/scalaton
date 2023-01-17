import Joi from "joi";

const validate = (data, schema ) => {

    return Joi.validate( data, schema, { "abortEarly": false}, ( err ) => {
        if( err ) {
            return Promise.reject(err);
        }

        return Promise.resolve( true );
    });
};

export default validate;