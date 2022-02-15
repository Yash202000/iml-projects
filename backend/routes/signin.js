const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let User  =  require('../models/user.model');

//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

const salt = 7;

function generateAccessToken(userinfo) {
    return jwt.sign(userinfo, process.env.TOKEN_SECRET);
  }

router.route('/').post(async (req,res)=>{
    User.findOne({username: req.body.username})
        .then(async (data)=>{
            
            let boolresult = await bcrypt.compare(req.body.password,data.password)
            if(boolresult){
                const token = generateAccessToken({ "username": data.username, "access": data.access})
                res.status(201).json({
                    msg: "ok",
                    Token: token
                })
            }else{
                res.status(401).json({
                    msg: "Invalid Password!"
                })
            }
        })
    
});

module.exports = router