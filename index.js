// Get the nodes
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios")
const generateHTML = require("./generateHTML");
const electron = require("electron")
const convertFactory = require("electron-html-to")

const conversion = convertFactory({converterPath: convertFactory.converters.PDF});

// Ask user their username and favorite color
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
]).then(function(res)
{
    const profileURL = `https://api.github.com/users/${res.username}`;
    const repoURL = `https://api.github.com/users/${res.username}/repos`;
    
    // Profile API Request
    axios.get(profileURL).then(userResult => 
    {
        const profileData = userResult.data;

        // Log API Data
        console.log(profileData)

        // Repo API request for stargazer count
        axios.get(repoURL).then(response =>
        {
            const repos = response.data;
            let totalStars = 0;
            repos.forEach(repo => totalStars += repo.stargazers_count);

            // Generate the HTML
            let data = {
                name: profileData.name,
                color: res.color,
                avatar_url: profileData.avatar_url,
                location: profileData.location,
                html_url: profileData.html_url,
                followers: profileData.followers,
                following: profileData.following,
                public_repos: profileData.public_repos,
                bio: profileData.bio,
                stars: totalStars
            }
            let genHTML = generateHTML(data);
            fs.writeFile(`${profileData.name}.html`, genHTML, function (err) {
                if (err) throw err;
            })
        })

        //     // Convert HTML into PDF
        //     conversion({html: genHTML}, function(err, result)
        //     {
        //         if(err)
        //         {
        //             return console.error(err);
        //         }

        //         result.stream.pipe(fs.createWriteStream(`${profileData.name}.pdf`));
        //         conversion.kill();
        //     });
        // });
    });
});