const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(cors({ origin: 'http://localhost:4200/list' }));

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'webapp',
    password: 'Jaga123@',
    database: 'emp-database',
    insecureAuth : true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header=("Access-Control-Allow-Methods","get, post, put, delete");
    next();
  });


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @salary = ?;SET @DOB = ?;SET @photoPath = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@salary,@DOB,@photoPath);";
    mysqlConnection.query(sql, [emp.id, emp.Name, emp.salary, emp.DOB, emp.photoPath], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @salary = ?;SET @DOB = ?;SET @photoPath = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@salary,@DOB,@photoPath);";
    mysqlConnection.query(sql, [emp.id, emp.Name, emp.salary, emp.DOB, emp.photoPath], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});