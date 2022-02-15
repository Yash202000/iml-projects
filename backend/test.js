// var AWS = require('aws-sdk');
// var s3 = new AWS.S3();


// //***** ***************** ***/
// //***** */ list bucket */****
// //************************* */

// var params = {};
//  s3.listBuckets(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data); 
//  })


//  //*********************** */
//  //*******list object******* */
//  //*********************** */
// var params = {
// Bucket: "test-python-s3-bucket", 
// Prefix: 'test/__pycache__/'
// };
// s3.listObjects(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);
// })


var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res, next){
    res.send('You did not say the magic word');
});


app.get('/s3Proxy', function(req, res, next){
    // download the file via aws s3 here
    var fileKey = 'desc.txt';

    console.log('Trying to download file', fileKey);
    var AWS = require('aws-sdk');
    // AWS.config.update(
    //   {
    //     accessKeyId: "....",
    //     secretAccessKey: "...",
    //     region: 'ap-southeast-1'
    //   }
    // );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : 'test-python-s3-bucket',
        Key    : 'desc.txt',
    };

    res.attachment(fileKey);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('S3 Proxy app listening at http://%s:%s', host, port);
});