INSERT INTO departments (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Salesperson', 80000, (SELECT id FROM departments WHERE name = 'Sales')),
        ('Lead Engineer', 150000, (SELECT id FROM departments WHERE name = 'Engineering')),
        ('Software Engineer', 120000, (SELECT id FROM departments WHERE name = 'Engineering')),
        ('Account Manager', 160000, (SELECT id FROM departments WHERE name = 'Finance')),
        ('Accountant', 125000, (SELECT id FROM departments WHERE name = 'Finance')),
        ('Legal Team Lead', 250000, (SELECT id FROM departments WHERE name = 'Legal')),
        ('Lawyer', 190000, (SELECT id FROM departments WHERE name = 'Legal'));

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Mike', 'Chan', (SELECT id FROM roles WHERE title = 'Salesperson')),
        ('Ashley', 'Rodriguez', (SELECT id FROM roles WHERE title = 'Lead Engineer')),
        ('Kevin', 'Tupik', (SELECT id FROM roles WHERE title = 'Software Engineer')),
        ('Kunal', 'Singh', (SELECT id FROM roles WHERE title = 'Account Manager')),
        ('Malia', 'Brown', (SELECT id FROM roles WHERE title = 'Accountant')),
        ('Sarah', 'Lourd', (SELECT id FROM roles WHERE title = 'Legal Team Lead')),
        ('Tom', 'Allen', (SELECT id FROM roles WHERE title = 'Lawyer'));

UPDATE employees 
SET manager_id = (SELECT id FROM (SELECT * FROM employees) AS sub WHERE first_name = 'Ashley' AND last_name = 'Rodriguez') 
WHERE first_name = 'Kevin' AND last_name = 'Tupik';

UPDATE employees 
SET manager_id = (SELECT id FROM (SELECT * FROM employees) AS sub WHERE first_name = 'Kunal' AND last_name = 'Singh') 
WHERE first_name = 'Malia' AND last_name = 'Brown';

UPDATE employees 
SET manager_id = (SELECT id FROM (SELECT * FROM employees) AS sub WHERE first_name = 'Sarah' AND last_name = 'Lourd') 
WHERE first_name = 'Tom' AND last_name = 'Allen';