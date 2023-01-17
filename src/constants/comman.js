const commonConstants = {
    "MAX_FILE_SIZE": 1000 * 1000 * 2, // 2 mb
    "MIN_FILE_HEIGHT": 150,
    "MIN_FILE_WIDTH": 150,
    "FILE_TYPES": [ "image/jpg", "image/jpeg", "image/png", "image/webp"],
    "USER_FILE_DIRECTORY": "./storage/users",
    "PASSWORD_SALT_ROUNDS": 10,
    "EMAIL_LOGO": "public/assets/logo/mail_logo.png",
    "JWT_EXPIRE_TIME": 86400 * 30,
    "PASS_REGEX": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,150}$/,
    "PLACEHOLDER_IMAGE": "public/assets/img/placeholder.png",
    "USER_IMAGE_FOLDER": "files/users"
}

export default commonConstants;