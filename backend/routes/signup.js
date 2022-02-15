const router  = require('express').Router();
let User  =  require('../models/user.model');
const bcrypt = require('bcrypt')


const salt = 7;


router.route('/list').get((req,res)=>{
    // console.log(req.body.username)
    // console.log(req.body.password)
    // console.log('r')
    User.find()
        .then(users => res.status(201).json(users))
        .catch(err=>res.status(400).json('Error: '+err));
    
});


router.route('/add').post(async (req,res)=>{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,salt);
    const access = 'r';
    const newUser = new User({
        username,password,access
    });

    newUser.save()
        .then(()=> res.status(201).json({"msg": "success"}))
        .catch(err=>res.json({"error": err}))

});



module.exports = router

