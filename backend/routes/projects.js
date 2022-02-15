const fetch = require('node-fetch')
const router = require('express').Router();
const { ProjectsBundle } = require('gitlab');
let Status = require('../models/status.model')
const jwt = require('jsonwebtoken')


//******************** */
//**********/list/missing_projects******* */
//******************* */
router.route('/list/missing_projects').post(async (req,res)=>{
    const token = req.headers['authorization'];

    let username = '';
    let access = '';


    try{
        var decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
        username = decodeToken.username;
        access = decodeToken.access;

    }catch(err){
        res.send({
            error : true,
            data: [],
            message : "Invalid token"
        })
        return
    }
    
    
    
    const services1 = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });


    services1.Projects.all()
    .then(async (data1) => {
        var output1 = []
        var output2 = []

        const data2 = await Status.find({},{id1:1,_id:0})
        
        data2.map(item=>{
            output2.push(item.id1)
        })

        console.log(output2)

        data1.map(item=>{
            if(!output2.includes(item.id)) output1.push({"id":item.id,"path_with_namespace":item.path_with_namespace,"days":Math.floor((new Date()-new Date(item.created_at))/86400000)})
        })

        res.json(output1)
    });

})



//******************** */
//************/list/present_projects******* */
//******************** */
router.route('/list/present_projects').post(async (req,res)=>{
    const token = req.headers['authorization'];

    let username = '';
    let access = '';


    try{
        var decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
        username = decodeToken.username;
        access = decodeToken.access;

    }catch(err){
        res.send({
            error : true,
            data: [],
            message : "Invalid token"
        })
        return
    }
    
    
    
    const data = await Status.find({},{_id:0})

    res.json(data)


})


//******************* */
//***************/list/not_synchronized ************** */
//******************** */
router.route('/list/not_synchronized').post(async (req,res)=>{
    const token = req.headers['authorization'];

    let username = '';
    let access = '';


    try{
        var decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
        username = decodeToken.username;
        access = decodeToken.access;

    }catch(err){
        res.send({
            error : true,
            data: [],
            message : "Invalid token"
        })
        return
    }
    
    
    
    const data = await Status.find({synchronized: false},{_id:0})

    res.json(data)


})

//********************** */
//***************/list/synchronized ************** */
//********************** */

router.route('/list/synchronized').post(async (req,res)=>{
    const token = req.headers['authorization'];

    let username = '';
    let access = '';


    try{
        var decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
        username = decodeToken.username;
        access = decodeToken.access;

    }catch(err){
        res.send({
            error : true,
            data: [],
            message : "Invalid token"
        })
        return
    }
    
    
    
    const data = await Status.find({synchronized: true},{_id:0})

    res.json(data)


})


//********************* */
//****************/export/:id */
//********************* */
router.route('/export/:id').get((req,res)=>{
    const services = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
        });

    console.log(req.params.id)
    services.ProjectImportExport.schedule(req.params.id)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
    
})

//********************* */
//****************/status/:id */
//********************* */
router.route('/status/:id').get((req,res)=>{
    const services = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
        });

    services.ProjectImportExport.exportStatus(req.params.id)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
    
    // const importProvider = new ProjectImportExport({
    //     token: process.env.GIT1_TOKEN,
    //     host: process.env.GIT1_URL
    // })

    // importProvider.importStatus(4157)
    //     .then(response=>res.json(response))
    
  
    
})


//********************* */
//****************/download */
//********************* */
router.route('/import/:id').get(async (req,res)=>{
    const services1 = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });

    const services2 = new ProjectsBundle({
        token: process.env.GIT2_TOKEN,
        host: process.env.GIT2_URL
    });
    // services.ProjectImportExport.schedule(4157)
    // .then(response=>console.log(response))
    
    var info = await services1.Projects.show(parseInt(req.params.id))
    services1.ProjectImportExport.schedule(parseInt(req.params.id))
        .then(async (response1)=>{
            if(response1.message==='202 Accepted'){
                var response2 = {
                    export_status: 'none'
                }
                do {
                    response2 =await services1.ProjectImportExport.exportStatus(parseInt(req.params.id))
                    console.log(response2)
                  }
                  while (response2.export_status!=='finished');



                  services1.ProjectImportExport.download(parseInt(req.params.id))
                    .then(response=>{
                    
                        // fs.writeFile("file.gzip", response, function(err) {
                        //     if(err) {
                        //         return console.log(err);
                        //     }
                        //     console.log("The file was saved!");
                        // });
                        services2.ProjectImportExport.import(response,info.name)
                            .then(response=>{
                                const id1 = info.id;
                                const id2 = response.id;
                                const path_with_namespace1 = info.path_with_namespace;
                                const path_with_namespace2 = response.path_with_namespace;
                                const synchronized = false;
                                
                                const newStatus = new Status({
                                    id1,id2,path_with_namespace1,path_with_namespace2,synchronized
                                })
                                newStatus.save()
                                    .then(()=> res.status(201).json("success"))
                                    .catch(err=>res.json({"error": err}))
                            })
                            .catch(err=>res.json(err))
                        
                    })


                
            }
        })
        .catch(err=>res.json(err))

    
    //const content = fs.readFileSync("./file.gzip");
    

    
    
    
    // importProvider.download(4157)
    //     .then(response=>response.download('./export.tar.gz',function(error){
    //         console.log("Error : ", error)
    //     }))
    
})



router.route('/delete/:id1/:id2').delete((req,res)=>{
    const services2 = new ProjectsBundle({
        token: process.env.GIT2_TOKEN,
        host: process.env.GIT2_URL
    });
    const projectid1 = parseInt(req.params.id1)
    const projectid2 = parseInt(req.params.id2)
    services2.Projects.remove(projectid2).then(
        response=>{
            if(response.message==='202 Accepted'){
                Status.findOneAndDelete({id1: projectid1})
                    .then(result => {
                        console.log(result)
                        if(result===null) res.json('failure')
                        else res.json('success')
                    }) //if not find sends 'null' else sends respond
                    .catch(err=>res.status(400).json('Error: '+err));
                
            }
        }
    ).catch(err=>res.json('failure'))

    // Status.findOneAndDelete({id1:req.params.id})
    //     .then(users => res.status(201).json(users)) //if not find sends 'null' else sends respond
    //     .catch(err=>res.status(400).json('Error: '+err));
    

})



module.exports = router


//https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples