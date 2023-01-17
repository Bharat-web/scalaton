import bcrypt from "bcryptjs";
import commonConstants from "../constants/comman";

function hashPassword( password ) {
    return bcrypt.hashSync( password, commonConstants.PASSWORD_SALT_ROUNDS );
}

function comparePassword( password, hash ) {
    
    return bcrypt.compareSync( password, hash );
}

const password = {
    hashPassword,
    comparePassword
}

export default password;