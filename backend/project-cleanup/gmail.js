const nodemailer = require('nodemailer');

module.exports = (toWhom='yashpanchwatkar@gmail.com')=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ash143732@gmail.com',
          pass: 'Yash@202000'
        }
    });
    details={
        from: 'ash143732@gmail.com',
        to: toWhom,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }

    transporter.sendMail(details, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}





