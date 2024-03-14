const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

app.listen(3001, () => {
    console.log('App is running on server 3001');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Emilio27.',
    database: 'enterprise_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the enterprise database!');
    questions();
});

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Please select an option to visualize:',
            choices: [
                'View all departments', 
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then(answers => {
        switch (answers.action) {
            case 'View all departments':
                viewAllDep();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmp();
                break;
            case 'Add a department':
                addDep();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Update an employee role':
                updateEmpRole();
                break;
            case 'Exit':
                db.end();
                console.log('See you later!');
                process.exit();
                break;
            default:
                console.log('Please select a valid option.')
                questions();
                break;
        }
    });
}