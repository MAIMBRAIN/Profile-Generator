// Get the nodes
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios")
const page = require("./generateHTML");


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
]).then(function({username})
{
    const queryURL = `https://api.github.com/users/${username}`
    
    axios.get(queryURL).then(res => 
        {
            fs.writeFile("profile.pdf", page.generateHTML);
        })
    
})