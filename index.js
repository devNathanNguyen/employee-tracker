const inquirer = require("inquirer");
const queries = require("./queries");
const cTable = require("console.table");

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
      // Code to add a department
      break;
    case "Add a role":
      // Code to add a role
      break;
    case "Add an employee":
      // Code to add an employee
      break;
    case "Update an employee role":
      // Code to update an employee role
      break;
    case "Exit":
      process.exit();
  }
};

mainMenu();
