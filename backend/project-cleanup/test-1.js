const { ProjectsBundle } = require('gitlab');


const services = new ProjectsBundle({
    token: process.env.GIT1_TOKEN,
    host: process.env.GIT1_URL
});

services.Projects.all().then(response=>{
    var output = []
    data.map(item=>{
        output.push(item.name)
    })
})

