const router =  require('express').Router()
var AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
var s3 = new AWS.S3();





//***** ***************** ***/
//***** */ download files */****
//************************* */

router.route('/').get((req,res)=>{
    
    
    // const token = req.headers['authorization'];
    const token = req.query.Token;
    
    let username = '';
    let access = '';
    try{
        var decodeToken = jwt.verify(token,process.env.SECRET)
        username = decodeToken.username;
        access = decodeToken.access;
        console.log(access)
        
        if( access==='r') throw new Error('you just have only read access.');
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
            data: [
                "you have only read access",
                "or token is expired..."
            ],
            message : "Invalid token"
        })
        return
    }
    // download the file via aws s3 here
    try{
        console.log(req.query)
        fname = decodeURI(req.query.Prefix).split('/')
        var fileKey = fname[fname.length-1];

        console.log('Trying to download file', fileKey);
        var AWS = require('aws-sdk');
        if(req.query.customer==='IML'){
            AWS.config.update(
              {
                accessKeyId: process.env.IML_ACCESS_KEY,
                secretAccessKey: process.env.IML_SECRET_KEY
              }
            );
        }
        else if(req.query.customer==='NEU'){
            AWS.config.update(
              {
                accessKeyId: process.env.NEU_ACCESS_KEY,
                secretAccessKey: process.env.NEU_SECRET_KEY
              }
            );
        }
        var s3 = new AWS.S3();
        
        var options = {
            Bucket    : req.query.Bucket,
            Key    : req.query.Prefix,
        };
        try{
            res.attachment(fileKey);
            var fileStream = s3.getObject(options).createReadStream();
            fileStream.pipe(res);
        }catch(err){
            res.send('error')
        }
        
    }catch(err){
        res.send({
            error : err,
            data: [],
            message : "Invalid token"
        })
    }
    

});

module.exports = router;