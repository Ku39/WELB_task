const { text } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    port: 5432,
    database: "Notes"
})

module.exports = pool;

// CREATE TABLE notes (
//     person VARCHAR(255),
//     note text,
//     id text
// );

// CREATE TABLE users (
//     email text,
//     password text,
//     token text
// );