const LocalStrategy = require( 'passport-local' ).Strategy;
const db = require( '../database/pool' );

module.exports = function( passport ) {
    passport.use( new LocalStrategy( async ( username, password, done ) => {
        const user = await db.getUserByUsername( username );
        if ( !user ) {
            console.log( "User not found:", user );
            return done( null, false, { message: 'Incorrect username.' } );
        }
        if ( user.password !== password ) {
            console.log( "Incorrect password for user:", user );
            return done( null, false, { message: 'Incorrect password.' } );
        }
        return done( null, user );
    } ) );

    passport.serializeUser( ( user, done ) => {
        done( null, user.id );
    } );
    passport.deserializeUser( async ( id, done ) => {
        try {
            const user = await db.getUserById( id );
            done( null, user );
        } catch ( err ) {
            done( err );
        }
    } );
};