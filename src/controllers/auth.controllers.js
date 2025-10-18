import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emailVerificationMailgenContent, sendEmail} from "../utils/mails.js";

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

export { registerUser };