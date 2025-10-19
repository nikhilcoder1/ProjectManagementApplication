import { body } from 'express-validator';

const userRegisterValidator = () => {
    return [
        body('email')
            .trim()
            .isEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address'),
        body('username')
            .trim()
            .isEmpty().withMessage('Username is required')
            .isLowercase().withMessage('Username must be in lowercase')
            .isString().withMessage('Username must be a string')
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password')
            .trim()
            .isEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('fullName')
            .optional()
            .trim()
            .isEmpty().withMessage('Full name is required')
            .isString().withMessage('Full name must be a string')
            .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long')
    ];
}


export {
    userRegisterValidator
};