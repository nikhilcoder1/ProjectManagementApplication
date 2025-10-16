import Mailgen from "mailgen";

import nodemailer from "nodemailer";

const sendEmail = async (options) =>{
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {  
            name: "TaskManager",
            link: "https://taskmanager.com/",
        },
    });

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHTML = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from : "mail.taskmanager@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHTML,
    }

    try {
        await transporter.sendMail(mail);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

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
    forgotPasswordMailgenContent,
    sendEmail
}