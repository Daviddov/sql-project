const express = require('express')
const mysql = require('mysql2');

const app = express()


const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "admin",
    database: "project_resouces"
})
db.connect(err => {
    if (err) throw err;
    console.log("DB Connected!");
})

// users
app.get('/:table', (req, res) => {
    let sql = `SELECT * FROM ${req.params.table}`
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
        console.log("fields: ", fields);
        res.send("Result: " + JSON.stringify(result));
    })
})

const createDB = `CREATE DATABASE project_resouces`

const createCommentsTable = `CREATE TABLE comments(id int AUTO_INCREMENT,
    postId INT,
    name VARCHAR(255),
    email VARCHAR(255),
    body VARCHAR(255),
    PRIMARY KEY(id))`


    // FOREIGN KEY(postId) REFERENCES post(id)

const createPostsTable = ` CREATE TABLE posts(id int AUTO_INCREMENT,
        userId  INT,
        title VARCHAR(255),
        body VARCHAR(255),
        PRIMARY KEY(id))`
        // FOREIGN KEY(userId) REFERENCES user(id)

const createTodosTable = `
        CREATE TABLE todos(id int AUTO_INCREMENT,
                userId INT,
                title VARCHAR(255),
                completed BOOLEAN,
                PRIMARY KEY(id)) `
                // FOREIGN KEY(userId) REFERENCES user(id)

const createUsersTable = ` CREATE TABLE users(id int AUTO_INCREMENT,
                postId INT,
                name VARCHAR(255),
                username VARCHAR(255),
                email VARCHAR(255),
                PRIMARY KEY(id))`
                // FOREIGN KEY(postId) REFERENCES post(id)
const makeTables = [
    createCommentsTable,
    createPostsTable,
    createTodosTable,
    createUsersTable
]

// db.query(createDB, (err, result, fields) => {
    //         if (err) throw err;
    //         console.log("Result: ", result);
    //     })

// makeTables.forEach(element => {
// db.query(element, (err, result, fields) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//     })
// });


// let stmt = `INSERT INTO todos(userId, title, completed) VALUES ?`;      
// let todos = [
//     [1, '1 todo', false],
//     [2, '2 todo', false],
//     [3,'3 todo', false],
//     [4, 'todo 4', true],
//     [5, 'todo 5', false]
// ];
//     db.query(stmt, [todos], (err, result, fields) => {
//             if (err) throw err;
//             console.log("Result: ", result);
//         })


// let stmt = `INSERT INTO comments(postId, name, email, body) VALUES ?`;      
// let comments = [
//     ['1', 'moshe', 'moshe@email.gmail.com', 'this is a good day'],
//     ['2', 'david', 'david@email.gmail.com', 'this is not good day'],
 
// ];
//     db.query(stmt, [comments], (err, result, fields) => {
//             if (err) throw err;
//             console.log("Result: ", result);
//         })


app.listen(3000, console.log("listning to port 3000"))
