import { Router  } from "express";
import authController from "../controllers/authController";
import { loginValidator, profileImageValidator, signupValidator, updatProfileValidator } from "../validators/authValidator";
import { setLanguage } from "../../../../middlewares/setLanguage";
import { Security } from "../../../../libraries/Security";

const authRouters = new Router();

authRouters.post( "/login", loginValidator, authController.login );
authRouters.post( "/auth/signup",
    setLanguage,
    profileImageValidator,
    signupValidator,
    authController.signup 
);
authRouters.post( "/user/update",
    setLanguage,
    Security.verifyJWT,
    profileImageValidator,
    updatProfileValidator,
    authController.updateProfile
);

export default authRouters;