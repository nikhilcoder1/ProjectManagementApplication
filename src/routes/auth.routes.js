import { Router } from "express";
import { login, logoutUser, refreshAccessToken, registerUser, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes(unsecured)
router.route("/register").post(userRegisterValidator() , validate , registerUser);

router.route("/login").post(userLoginValidator() , validate , login);

router.route("/verify-email/:verficationToken").get(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/forgot-password").post(userForgotPasswordValidator() , validate , forgotPaasswordRequest);

router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator() , validate , resetForgotPassword);

// Secured route
router.route("/logout").post(verifyJWT , logoutUser);

export default router;