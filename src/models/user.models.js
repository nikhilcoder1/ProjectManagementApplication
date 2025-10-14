import mongoose , { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        avatar: { 
            type: 
            {
                url : String,
                localPath:String,
            },
            default:
            {
                url : `https://placehold.co/200x200`,
                localPath : ""
            }
        },

        username : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30,
            index: true,
        },

        email : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        fullName : {
            type: String,
            trim: true,
        },

        password : { 
            type: String,
            required: [true,"Password is required"],
            minlength: [6,"Password must be at least 6 characters"],
        },

        isEmailVerified : {
            type: Boolean,
            default: false,
        },

        refreshToken : {
            type: String,
        },

        forgotPasswordToken : {
            type: String,
        },

        forgotPasswordTokenExpiry : {
            type: Date,
        },

        emailVerificationToken : {
            type: String,
        },

        emailVerificationTokenExpiry : {
            type: Date,
        },
    },
    { 
        timestamps: true 
    }
);


export const User = mongoose.model("User", userSchema);