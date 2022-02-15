const router  = require('express').Router();
let User  =  require('../models/user.model');
const jwt = require('jsonwebtoken');

//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });


function generateAccessToken(userinfo) {
    return jwt.sign(userinfo, process.env.SECRET);
  }



router.route('/').post((req,res)=>{

    User.find({
        username: req.body.username,
        password: req.body.password,
    })
    .then(result=>{
        console.log(result[0].access,result[0].username)
        if(result.length){
            console.log('jwt created')
            const token = generateAccessToken({ username: req.body.username,access: result[0].access})
            res.status(200).json({status: 'ok',user: true, Token: token})
        }else{
            return res.status(400).json({status: "error", user: false})
        }
    })
    .catch(err=>res.status(401).json({status: "error",user: false}))

});



module.exports = router

