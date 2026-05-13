const db = require( '../database/pool' );
const passport = require( 'passport' );

exports.indexController = ( req, res ) => {
    res.render( 'index', { user: req.user  } );
}
exports.signUpControllerGet = ( req, res ) => {
    res.render( 'sign-up' );
}
exports.signUpControllerPost = async ( req, res ) => {
    await db.newUser( req.body.username, req.body.email, req.body.password );
    res.redirect( '/' );
}
exports.loginControllerGet = ( req, res ) => {
    res.render( 'login' );
}
exports.loginControllerPost = passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/login'
} );