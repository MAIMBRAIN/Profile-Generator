// Get the nodes
var fs = require("fs");
var inquirer = require("inquirer");
var page = require("./generateHTML")

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["Red", "Blue", "Green", "Pink"],
        name: "color"
    }
]).then(function(data)
{
    fs.writeFile("profile.pdf", page.generateHTML);
})