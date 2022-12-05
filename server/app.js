const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

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

app.use(cors())
// get table
app.route('/:table')
    .get((req, res) => {
        if (req.params.table === 'favicon.ico') {
            console.log('favicon.ico');
        } else if (req.params.table === 'users' || 'posts' || 'comments' || 'todos') {
            let sql = `SELECT * FROM ${req.params.table}`
            dbQuery(sql, res)
        }
    })
    // add record
    .post((req, res) => {
        let body
        switch (req.params.table) {
            case 'users':
                body = { postId: 1, name: 'eitan', username: 'aa', email: 'aa@gmail.com' }
                break;
            case 'posts':
                body = { userId: 1, title: 'some title', body: 'this is body' }
                break;
            case 'todos':
                body = { userId: 1, title: 'some to do', completed: true }
                break;
            case 'comments':
                body = { postId: 1, name: 'david', email: 'aa@gmail.com', body: 'body comments' }
                break;
            default:
                break;
        }
        let sql = `INSERT INTO ${req.params.table} SET ?`
        dbQuery(sql, res)
    })

app.get('/users/:id/:table', (req, res) => {
    let sql = `SELECT * 
    FROM ${req.params.table} 
    WHERE ${req.params.id} = userId`
    dbQuery(sql, res)
});

app.route('/:table/:id')
    // get record from table
    .get((req, res) => {
        if (req.params.table === 'favicon.ico') {
            console.log('favicon.ico');
        } else if (req.params.table === 'users' || 'posts' || 'comments' || 'todos') {
            let sql = `SELECT * 
                    FROM ${req.params.table} 
                    WHERE ${req.params.id} = id`
            dbQuery(sql, res)
        }
    })
    // update up for the record
    .put((req, res) => {
        let sql = ''
        let body = [];
        switch (req.params.table) {
            case 'users':
                sql = `UPDATE users 
                        SET name = ?, username = ?, email = ? 
                        WHERE id = ?`;
                body = ['yosi', 'yos', 'yosi@gmail.com', req.params.id]
                break;
            case 'posts':
                sql = `UPDATE posts 
                    SET title = ?, body = ? 
                    WHERE id = ?`;
                body = ['some title', 'some body', req.params.id]
                break;

            default:
                break;
        }
        dbQueryWithBody(sql,body, res)
    })
    // delete todos
    .delete((req, res) => {
        if (req.params.table === 'todos') {
            let sql = `DELETE from ${req.params.table} WHERE id = ${req.params.id}`
            dbQuery(sql, res)
        }
    })

app.get('/:tableA/:id/:tableB', (req, res) => {
    if (req.params.tableA === 'favicon.ico') {
        console.log('favicon.ico');
    } else if (req.params.tableA === 'user' || 'post') {
        let sql = `SELECT * 
                    FROM ${req.params.tableB} 
                    WHERE ${req.params.id} = ${req.params.tableA}Id`
        dbQuery(sql, res)
    }
});

// app.put('/:tableA/:id/:tableB/:checked', (req, res) => {
//     console.log('put');
//     if (req.params.tableB === 'todos') {
//         sql = `UPDATE todos 
//         SET completed = ?
//         WHERE id = ?`;
//         body = [req.params.checked, req.params.id]
//         console.log(body);
//         dbQueryWithBody(sql, body, res)
//     }

// });



const dbQuery = (sql, res) => {
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
        res.send(JSON.stringify(result));
    })
}

const dbQueryWithBody = (sql, body, res) => {
    db.query(sql, body, (err, result, fields) => {
        if (err) throw err;
        console.log("Result: ", result);
        res.send(JSON.stringify(result));
    })
}

app.listen(5000, console.log("listning to port 5000"));
