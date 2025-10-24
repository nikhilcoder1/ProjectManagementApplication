import { Router } from "express";
import { changeCurrentPassword, getcurrentUser, login, logoutUser, refreshAccessToken, registerUser, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

import { forgotPasswordRequest, resetForgotPassword,resendEmailVerification} from "../controllers/auth.controllers.js";

const router = Router();

// Public routes(unsecured)
router.route("/register").post(userRegisterValidator() , validate , registerUser);

router.route("/login").post(userLoginValidator() , validate , login);

router.route("/verify-email/:verficationToken").get(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/forgot-password").post(userForgotPasswordValidator() , validate , forgotPasswordRequest);

router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator() , validate , resetForgotPassword);

// Secured route
router.route("/logout").post(verifyJWT , logoutUser);

router.route("/current-user").post(verifyJWT , getcurrentUser);

router.route("/change-password").post(verifyJWT , userChangeCurrentPasswordValidator() , validate , changeCurrentPassword);

router.route("/resend-email-verification").post(verifyJWT , resendEmailVerification);

export default router;