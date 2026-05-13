const { validationResult, matchedData } = require( 'express-validator' );
const validation = require( '../config/validationMethods' );
const pool = require( '../database/pool' );

exports.createNewMessageGet = ( req, res ) => {
    res.render( 'createMessage', { user: req.user } );
}

exports.createNewMessagePost = [
    validation.messageValidation, async ( req, res ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.render( 'createMessage', { user: req.user, errors: errors.array() } );
        }
        // Process the form data and save the new message to the database
        const { title, message } = matchedData( req );
        const userId = req.params.id;
        // Call the database function to create the new message
        await pool.createNewMessage( userId, title, message );
        res.redirect( '/' );
    }
]