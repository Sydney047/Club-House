const { body } = require( 'express-validator');

exports.signUpValidation = [
    body( 'username' ).trim()
        .isLength( { min: 3 } ).withMessage( 'Username must be at least 3 characters long.' ),
    body( 'email' ).optional().trim()
        .isEmail().withMessage( 'Email must be a valid email' ),
    body( 'password' ).isLength( { min: 6 } ).withMessage( 'Password must be at least 6 characters long.' )
        .isStrongPassword({ minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage( 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.' ),
    body( 'confirmPassword' ).custom( ( value, { req } ) => {
        if ( value !== req.body.password ) {
            throw new Error( 'Passwords do not match.' );
        }        return true;
    } ).withMessage( 'Confirm password must match password.' )
]

exports.loginValidation = [
    body( 'username' ).trim()
        .notEmpty().withMessage( 'Username is required.' ),
    body( 'password' ).notEmpty().withMessage( 'Password is required.' )
]
//message validation
exports.messageValidation = [
    body( 'title' ).trim()
        .isLength( { min: 3, max: 50 } ).withMessage( 'Message title must be between 3 and 50 characters long.' ),
    body( 'message' ).trim().escape()
        .isLength( { min: 10, max: 500 } ).withMessage( 'Message content must be between 10 and 500 characters long.' )
]