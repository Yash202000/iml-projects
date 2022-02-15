const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())




const uri = process.env.DB_URL;

mongoose.connect(uri,{useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('database connectino established successfully.....');
})




const signup = require('./routes/signup')
const signin = require('./routes/signin')
const bucket = require('./routes/buckets')
const files  = require('./routes/files')
const download = require('./routes/download')


app.use('/signup',signup)
app.use('/signin',signin)
app.use('/buckets',bucket)
app.use('/files',files)
app.use('/download',download)






try{
    app.listen(port,()=>{
        console.log(`Server is running on port : ${port}`)
    })
}catch(error){
    console.log(error);
}