const db = require( '../database/pool' );
const passport = require( 'passport' );
const { validationResult, matchedData } = require( 'express-validator' );
const validation = require( '../config/validationMethods' );

exports.indexController = ( req, res ) => {
    res.render( 'index', { user: req.user  } );
}
exports.signUpControllerGet = ( req, res ) => {
    res.render( 'sign-up' );
}
exports.signUpControllerPost = [
    validation.signUpValidation, async ( req, res, next ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 ).render( 'sign-up', { errors: errors.array() } );
        }
        const { username, email, password } = matchedData( req, { includeOptionals: true } );
        await db.newUser( username, email, password );
        res.redirect( '/login' );
    }, 
]
exports.loginControllerGet = ( req, res ) => {
    res.render( 'login' );
}
exports.loginControllerPost = [
    validation.loginValidation, ( req, res, next ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 ).render( 'login', { errors: errors.array() } );
        }
        next();
    },
    passport.authenticate( 'local', { failureRedirect: '/login', successRedirect: '/' } )
]
exports.logoutController = ( req, res ) => {
    req.logout( err => {
        if ( err ) { return console.log( err ); }
        res.redirect( '/' );
    });
}