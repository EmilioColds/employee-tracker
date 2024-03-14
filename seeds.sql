INSERT INTO departments (department_id, department_name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (role_id, title, salary, department_id)
VALUES  ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES  ('Mike', 'Chan', 1, (SELECT employee_id FROM employees WHERE first_name = 'John' AND last_name = 'Doe')),
        ('Ashley', 'Rodriguez', 2, NULL),
        ('Kevin', 'Tupik', 3, (SELECT employee_id FROM employees WHERE first_name = 'Ashley' AND last_name = 'Rodriguez')),
        ('Kunal', 'Singh', 4, NULL),
        ('Malia', 'Brown', 5, (SELECT employee_id FROM employees WHERE first_name = 'Kunal' AND last_name = 'Singh')),
        ('Sarah', 'Lourd', 6, NULL),
        ('Tom', 'Allen', 7, (SELECT employee_id FROM employees WHERE first_name = 'Sarah' AND last_name = 'Lourd'));

