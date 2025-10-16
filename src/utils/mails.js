import Mailgen from "mailgen";


const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome! We're excited to have you on board.",
            action: {
                instructions: "To get started with your account, please click the button below to verify your email address:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Verify Email",
                    link: verificationUrl,  
                },
            },
            outro: "If you did not create an account, no further action is required on your part.",
        },
    };  
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name : username,
            intro: "We got a request to reset the password.",
            action: {
                instructions: "To reset your password, please click the button below:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Reset Password",
                    link: passwordResetUrl,  
                },
            },
            outro: "If you did not create an account, no further action is required on your part.",
        }  
    }   
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}