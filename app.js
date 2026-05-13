require( 'dotenv' ).config();
const express = require('express');
const passport = require( 'passport' );
const session = require( 'express-session' );
const path = require('path');
const userRouter = require( './routes/userRouter' );

const app = express();
//ejs settings
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );
app.use( express.urlencoded({ extended: true }) );
//static files
const staticPath = path.join( __dirname, 'public' );
app.use( express.static( staticPath ) );
//session settings
app.use( session({ secret: "cats", resave: false, saveUninitialized: false }) );
//passport settings
app.use( passport.initialize() );
app.use( passport.session() );
require( './config/passport' )( passport );

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => console.log( `Server is running on port ${ PORT }` ) );


//routes
app.use( '/', userRouter );
