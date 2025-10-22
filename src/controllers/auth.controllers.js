import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-errors.js";
import asyncHandler from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail} from "../utils/mails.js";
import jwt, { decode } from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found", []);
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(
            500, 
            "Failed to generate tokens", [error.message]);
    }    
};

const registerUser = asyncHandler(async (req, res) => {
    const {email , username , password , role } = req.body

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser){
        throw new ApiError(409, "Username or Email already exists",[]);
    }

    const user = await User.create({
        email , 
        username , 
        password , 
        isEmailVerified: false,
    })

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Email Verification",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email?token=${unHashedToken}`
        )
    });

    const createdUser = await User.findById(user.id).select("-password -refreshToken -refreshToken -emailVerificationToken -emailVerificationExpiry");

    if(!createdUser){
        throw new ApiError(500, "User creation failed", []);
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201, 
            {user: createdUser},
            "User registered successfully and verification email sent."
        )
    );
}); 

const login = asyncHandler(async (req, res) => {
    const {email,password,username} = req.body

    if(!email){
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400, "User does not exists");
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid credentials");
    }
    
    const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user.id).select("-password -refreshToken -refreshToken -emailVerificationToken -emailVerificationExpiry");

    const cookieOptions = {
        httpOnly: true,
        secure : true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
        $set: { 
            refreshToken: "" 
        }
    },
    {
        new: true,
    }
);

    const options = {
        httpOnly: true,
        secure : true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    );
});

const getcurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {user: req.user},
            "Current user fetched successfully"
        )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    if(!verificationToken){ 
        throw new ApiError(400, "Email Verification token is required");
    }

    let hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },
    });

    if(!user){
        throw new ApiError(400, "Invalid or expired email verification token");
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    user.isEmailVerified = true;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                isEmailVerified: true
            },
            "Email verified successfully"
        )
    );
});

const resendEmailVerification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id); 

    if(!user){  
        throw new ApiError(404, "User not found");
    }

    if(user.isEmailVerified){
        throw new ApiError(409, "Email is already verified");
    }

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Email Verification",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email?token=${unHashedToken}`
        )
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Verification email resent successfully"
        )
    );

});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Refresh token is missing");
    }

    try {
        jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new ApiError(401, "Invalid refresh token - user not found");
        }

        if(user?.refreshToken !== incomingRefreshToken){
            throw new ApiError(401, "Refresh token is expired");
        }

        const options = {
            httpOnly : true,
            secure : true,
        }

        const {accessToken,refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id);

        user.refreshToken = newRefreshToken;
        await user.save({validateBeforeSave: false});

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed successfully"
            )
        );

    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User with this email does not exist");
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();  

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Password Reset Request",  
        mailgenContent: forgotPasswordMailgenContent(
            user.username,
            `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
        )
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password reset email sent successfully"
            )
        );
});

export {
    registerUser ,
    login , 
    logoutUser  , 
    getcurrentUser , 
    verifyEmail , 
    resendEmailVerification , 
    refreshAccessToken,
    forgotPasswordRequest
};