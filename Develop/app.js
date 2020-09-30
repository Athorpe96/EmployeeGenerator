const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const team = [];




function employeeInfo() {
    inquirer.prompt([
        {
            type: "list",
            message: "What kind of employee would you like add?",
            name: "name",
            choices: ["Intern", "Engineer", "Manager", "Team Created"],
        },
    ]).then(val => {
        if (val.name === "Intern") {
            internInfo();
        } else if (val.name === "Engineer") {
            engineerInfo();
        } else if (val.name === "Manager") {
            managerInfo();
        } else if (val.name === "Team Created") {
            generateHTML(outputPath, render(team));
        };
    });
};

function managerInfo() {
    return inquirer.prompt([
        {
            message: "What is the manager's name?",
            name: "name"
        },
        {
            message: "What is the manager's id?",
            name: "id"
        },
        {
            message: "What is the manager's email?",
            name: "email"
        },
        {
            message: "What is the manager's office number?",
            name: "officeNumber"
        },
    ]).then(function (answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
        team.push(manager);

        employeeInfo()
    })
};

function engineerInfo() {
    return inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            message: "What is the engineer's Github username?",
            name: "github"
        }
    ]).then(function (answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        team.push(engineer);

        employeeInfo();
    })
};

function internInfo() {
    return inquirer.prompt([
        {
            message: "What is the intern's name?",
            name: "name"
        },
        {
            message: "What is the intern's id?",
            name: "id"
        },
        {
            message: "What is the intern's email?",
            name: "email"
        },
        {
            message: "What school does the intern go to?",
            name: "school"
        }
    ]).then(function (answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        team.push(intern);

        employeeInfo();
    })
};

function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("All finished! Your team info is now created!");
    });
};

employeeInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
