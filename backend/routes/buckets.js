const router =  require('express').Router()
var AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')





//***** ***************** ***/
//***** */ list bucket */****
//************************* */

router.route('/').post((req,res)=>{
    const token = req.headers['authorization'];
    console.log(req.body.customer)
    
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
    var params = {};
    s3.listBuckets(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     res.status(201).json(data); 
    })

});

module.exports = router;