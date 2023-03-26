-- Insert sample data into department table
INSERT INTO department (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Marketing');
-- Insert sample data into role table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 90000, 1),
    ('Software Engineer', 80000, 2),
    ('Accountant', 70000, 3),
    ('Marketing Manager', 75000, 4);
-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Jim', 'Brown', 3, 1),
    ('Jill', 'Johnson', 4, 1);