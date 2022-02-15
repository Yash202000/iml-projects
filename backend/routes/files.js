const router =  require('express').Router()
var AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')





//***** ***************** ***/
//***** */ list files */****
//************************* */

router.route('/').post((req,res)=>{
    const token = req.headers['authorization'];
   
    
    let username = '';
    let access = '';
    try{
        var decodeToken = jwt.verify(token,process.env.SECRET)
        username = decodeToken.username;
        access = decodeToken.access;
        
        // res.status(201).send({
        //     error: false,
        //     data: {
        //         "username": username,
        //         "access": access
        //     },
        //     message: "success"
        // })

    }catch(err){
        res.send({
            error : true,
            data: [],
            message : "Invalid token"
        })
        return
    }
    if(req.body.customer==='IML'){
        AWS.config.update(
          {
            accessKeyId: process.env.IML_ACCESS_KEY,
            secretAccessKey: process.env.IML_SECRET_KEY
          }
        );
    }
    else if(req.body.customer==='NEU'){
        AWS.config.update(
          {
            accessKeyId: process.env.NEU_ACCESS_KEY,
            secretAccessKey: process.env.NEU_SECRET_KEY
          }
        );
    }
    var s3 = new AWS.S3();
    var output = []
    // var params = req.body
    var params = {
        Bucket: req.body.Bucket, 
        Prefix: req.body.Prefix
        };
    
    console.log(params)
    s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else    {
        data.Contents.forEach(element => {
            if(!output.includes(element.Key.split(params.Prefix).at(-1).split('/').at(0))){
            output.push(element.Key.split(params.Prefix).at(-1).split('/').at(0))
            }
        });
        res.status(201).json(output)
    };
    })

});

module.exports = router;