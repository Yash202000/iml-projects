const router = require('express').Router();
const { ProjectsBundle } = require('gitlab');
const jwt = require('jsonwebtoken')



router.route('/notupdated').post(async (req,res)=>{

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
    
    
    
    const services = new ProjectsBundle({
        token: process.env.GIT1_TOKEN,
        host: process.env.GIT1_URL
    });

    //4902

    services.Projects.all()
    .then(async (data) => {
        output = []
        
        data.map(item=>{
            let no = Math.floor((new Date()-new Date(item.last_activity_at))/86400000)
            if(no>=req.body.days){
                output.push([item.id,item.path_with_namespace,item.last_activity_at])
            }
        })
        
        
        res.json({
            error : false,
            data: output,
            message : "Success..."
        })
    });

})


module.exports = router;