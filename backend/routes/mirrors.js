const router = require('express').Router();
const { exec } = require("child_process");
const { ProjectsBundle } = require('gitlab');
const axios = require('axios')
const jwt =  require('jsonwebtoken')
let Status = require('../models/status.model')


//https://www.npmjs.com/package/gitlab



router.route('/list').get(async (req,res)=>{
    
    const services = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });

    services.Projects.all()
    .then(async (data) => {
        //res.json(data)
        var output = []
        data.map(item=>{
            output.push(item.id)
        })
        
        const asyncres = await Promise.all(output.map(async (item)=>{
        var response = await fetch(process.env.GIT1_URL+'/api/v4/projects/'+item+'/remote_mirrors', {
            method: 'GET',
            headers: {
            'PRIVATE-TOKEN': process.env.GIT1_TOKEN,
            'Content-Type': 'application/json',
         },
         })
         var data = await response.json()
         console.log(data)
         const out =  await Promise.all(data.map(item=> {
             return item
         }))
         return out
    }))
    res.json({
        "ids": output,
        "output": asyncres
    })
    });

})




router.route('/create/:id').get((req,res)=>{
    var id = parseInt(req.params.id)
    let info  = {
        "URL1": process.env.GIT1_URL,
        "PVTOKEN1": process.env.GIT1_TOKEN,
        "URL2": process.env.GIT2_URL,
        "PVTOKEN2": process.env.GIT2_TOKEN,
        "URL2_USER": process.env.GIT2_ADMIN,
        "ID": req.params.id
    };
    let resultToken = jwt.sign(info,process.env.TOKEN_SECRET)
    let encinfo = {
        "key": resultToken
    }

    axios.post('http://localhost:5001', encinfo)
    .then(response=>{
        if(response.data==='success'){
            Status.findOneAndUpdate({id1: id},{synchronized: true})
                .then(result=>res.json("success"))
                .catch(err=>res.json(err))
        }
    })
    .catch(err=>res.json(err))
    
    
    
    
})

module.exports = router;
