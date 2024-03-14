const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { type } = require('os');
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

function viewAllDep() {
    db.query('SELECT * FROM departments', (err, result) => {
        if (err) throw err;
        console.table(results);
        questions();
    });
}

function viewAllRoles() {
    const sqlPrompt =   `SELECT roles.id, roles.title, departments.name AS department, roles.salary 
                        FROM roles 
                        JOIN departments ON roles.department_id = departments.id`
    db.query(sqlPrompt, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    });
}

function viewAllEmp() {
    const sqlPrompt =   `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
                        FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees manager ON employees.manager_id = manager.id`
    db.query(sqlPrompt, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    });
}

function addDep() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepName',
            message: 'Please enter the name for the new department',
        }
    ]).then(answer => {
        db.query('INSERT INTO departments (name) VALUES (?)', answer.newDepName, (err, results) => {
            if (err) throw err;
            console.log(`Added ${answer.newDepName} to the enterprise's database.`);
            questions();
        });
    });
}

function addRole() {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please enter the title for the new role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary for the new role:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Please select the department for the new role:',
                choices: departments.map(department => ({name: department.name, value: department.id}))
            }
        ]).then(answer => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.title, answers.salary, answers.departmentId],
            (err, results) => {
                if (err) throw err;
                console.log(`Added ${answers.title} as a new role to the enterprise's database`);
                questions();
            });
        });
    });
}


