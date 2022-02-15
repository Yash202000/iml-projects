const fetch = require('node-fetch')
const router = require('express').Router();
const { ProjectsBundle } = require('gitlab');
let Status = require('../models/status.model')



router.route('/').get(async (req,res)=>{
    const response = await Status.findOneAndUpdate({id1: 1},{synchronized: false})
    console.log(response)
    res.json('happend...')

})


router.route('/delete/:id').get((req,res)=>{
    const services = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });
    // console.log(req.params.id)
    
    services.Projects.remove(req.params.id)
    .then(response=>res.json(response))

})

router.route('/info').get(async (req,res)=>{
    const services1 = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });

    var info = await services1.Projects.show(4902)
    res.json(info)
})



module.exports = router;