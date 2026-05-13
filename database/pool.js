require( 'dotenv' ).config();
const { Pool } = require( 'pg' );

const pool = new Pool({
    connectionString: process.env.DATABASE_URI
})

// const createTable = async function(){
//     await pool.query( `CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//         username VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL
//     )` );

//     await pool.query( `CREATE TABLE IF NOT EXISTS userMessages (
//         user_id INTEGER REFERENCES users( id ),
//         title VARCHAR(50) NOT NULL,
//         message TEXT NOT NULL,
//         timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//     )` );
// }
exports.newUser = async ( username, email, password ) => {
    try {
        console.log( "Seeding" );
        await pool.query( `INSERT INTO users ( username, email, password ) VALUES ( $1, $2, $3 )`, [ username, email, password ] );
        console.log( "User created successfully" );
    } catch ( err ) {
        console.log( err );
    }
}
exports.getUserByUsername = async ( username ) => {
    try {
        const { rows } = await pool.query( `SELECT * FROM users WHERE username = $1`, [ username ] );
        return rows[0];
    } catch ( err ) {
        console.log( err );
    }
}
exports.getUserById = async ( id ) => {
    try {
        const { rows } = await pool.query( `SELECT * FROM users WHERE id = $1`, [ id ] );
        return rows[0];
    } catch ( err ) {
        console.log( err );
    }
}