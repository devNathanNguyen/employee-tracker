import inquirer from 'inquirer';
import queries from './db/queries.js';
import cTable from 'console.table';

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });

  switch (action) {
    case "View all departments":
      const departments = await queries.getAllDepartments();
      console.table(departments[0]);
      mainMenu();
      break;
    case "View all roles":
      const roles = await queries.getAllRoles();
      console.table(roles[0]);
      mainMenu();
      break;
    case "View all employees":
      const employees = await queries.getAllEmployees();
      console.table(employees[0]);
      mainMenu();
      break;
    case "Add a department":
      const departmentData = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the department name:",
        },
      ]);

      await queries.addDepartment(departmentData);
      console.log(`Department "${departmentData.name}" added successfully.`);
      mainMenu();
      break;
    case "Add a role":
      const departmentChoices = (await queries.getAllDepartments())[0].map(
        (department) => ({
          name: department.name,
          value: department.id,
        })
      );

      const roleData = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the role title:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the role salary:",
        },
        {
          type: "list",
          name: "department_id",
          message: "Select the department for the role:",
          choices: departmentChoices,
        },
      ]);

      await queries.addRole(roleData);
      console.log(`Role "${roleData.title}" added successfully.`);
      mainMenu();
      break;
    case "Add an employee":
      const allRoles = await queries.getAllRoles();
      const allEmployees = await queries.getAllEmployees();
      const roleChoices = roles[0].map((role) => ({
        name: role.title,
        value: role.id,
      }));
      const managerChoices = employees[0].map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      managerChoices.unshift({ name: "None", value: null });

      const employeeData = await inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the employee first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the employee last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "Select the employee role:",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Select the employee manager:",
          choices: managerChoices,
        },
      ]);

      await queries.addEmployee(employeeData);
      console.log(
        `Employee "${employeeData.first_name} ${employeeData.last_name}" added successfully.`
      );
      mainMenu();
      break;
    case "Update an employee role":
      const employeeChoices = employees[0].map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: employeeChoices,
        },
        {
          type: "list",
          name: "newRoleId",
          message: "Select the new role:",
          choices: roleChoices,
        },
      ]);

      await queries.updateEmployeeRole(employeeId, newRoleId);
      console.log("Employee role updated successfully.");
      mainMenu();
      break;
    case "Exit":
      process.exit();
  }
};

mainMenu();
