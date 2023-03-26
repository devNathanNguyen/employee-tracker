const connection = require("./db");

const getAllDepartments = () => {
  return connection.promise().query("SELECT * FROM department");
};

const getAllRoles = () => {
  return connection.promise().query("SELECT * FROM role");
};

const getAllEmployees = () => {
  return connection.promise().query("SELECT * FROM employee");
};

const addDepartment = (departmentName) => {
  return connection
    .promise()
    .query("INSERT INTO department SET ?", { name: departmentName });
};

const addRole = (roleData) => {
  return connection.promise().query("INSERT INTO role SET ?", roleData);
};

const addEmployee = (employeeData) => {
  return connection.promise().query("INSERT INTO employee SET ?", employeeData);
};

const updateEmployeeRole = (employeeId, roleId) => {
  return connection
    .promise()
    .query("UPDATE employee SET role_id = ? WHERE id = ?", [
      roleId,
      employeeId,
    ]);
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
