const router  = require('express').Router();
let User  =  require('../models/user.model');


router.route('/list').get((req,res)=>{
    // console.log(req.body.username)
    // console.log(req.body.password)
    // console.log('r')
    User.find()
        .then(users => res.status(201).json(users))
        .catch(err=>res.status(400).json('Error: '+err));
    
});


router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const access = 'r';
    const newUser = new User({
        username,password,access
    });

    newUser.save()
        .then(()=> res.status(201).json({"msg": "success"}))
        .catch(err=>res.json({"error": err}))

});



module.exports = router

