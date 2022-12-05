const mysql = require('mysql2');

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

const createDB = () => {
    const createDB = `CREATE DATABASE project_resouces`
    db.query(createDB, (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

const createCommentsTable = () => {
    `CREATE TABLE comments(id int AUTO_INCREMENT,
    postId INT,
    name VARCHAR(255),
    email VARCHAR(255),
    body VARCHAR(255),
    PRIMARY KEY(id))`
}

const createPostsTable = () => {
    `CREATE TABLE posts(id int AUTO_INCREMENT,
        userId  INT,
        title VARCHAR(255),
        body VARCHAR(255),
        PRIMARY KEY(id))`
}

const createTodosTable = () => {
    `
        CREATE TABLE todos(id int AUTO_INCREMENT,
                userId INT,
                title VARCHAR(255),
                completed BOOLEAN,
                PRIMARY KEY(id)) `
}

const createUsersTable = () => {
    `CREATE TABLE users(id int AUTO_INCREMENT,
                postId INT,
                name VARCHAR(255),
                username VARCHAR(255),
                email VARCHAR(255),
                PRIMARY KEY(id))`
}

const makeTables = () => {
    [
        createCommentsTable,
        createPostsTable,
        createTodosTable,
        createUsersTable
    ]
    // makeTables
    makeTables.forEach(element => {
        db.query(element, (err, result, fields) => {
            if (err) throw err;
            console.log("Result: ", result);
        })
    });
}

// INSERT  todos

let insertTodos = () => {
    let sql = `INSERT INTO todos(userId, title, completed) VALUES ?`;
    let todos = [
        [1, '1 todo', false],
        [2, '2 todo', false],
        [3, '3 todo', false],
        [4, 'todo 4', true],
        [5, 'todo 5', false]
    ];
    db.query(sql, [todos], (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

// INSERT  comments
let insertComments = () => {
    let sql = `INSERT INTO comments(postId, name, email, body) VALUES ?`;
    let comments = [
        ['1', 'moshe', 'moshe@email.gmail.com', 'this is a good day'],
        ['2', 'david', 'david@email.gmail.com', 'this is not good day'],
    ];
    db.query(sql, [comments], (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

// INSERT  posts
let insertPost = () => {
    let sql = `INSERT INTO posts(userId, title, body) VALUES ?`;
    let posts = [
        ['1', 'one day', 'this is a good day'],
        ['2', 'secound day', 'this is not good day'],

    ];
    db.query(sql, [posts], (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

// // INSERT  users
let insertUsers = () => {
    let sql = `INSERT INTO users(postId, name, username, email) VALUES ?`;
    let users = [
        ['1', 'david', 'dd', 'dd@gmail.com'],
        ['2', 'mush', 'mumu', 'mm@gmail.com'],
    ];
    db.query(sql, [users], (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

// // ADD FOREIGN KEY
let fk = () => {
    let sql = `ALTER TABLE users
ADD FOREIGN KEY (postId) REFERENCES posts(id)`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

const addcolumn = () => {
        let sql = `ALTER TABLE users ADD COLUMN pasword VARCHAR(15)`
        db.query(sql, (err, result, fields) => {
            if (err) throw err;
            console.log("Result: ", result);
        })
    }

    const updateColumn = () => {
        let sql = `UPDATE users SET pasword = 1234 `
        db.query(sql, (err, result, fields) => {
            if (err) throw err;
            console.log("Result: ", result);
        })
    }
   
