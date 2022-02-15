const cron = require('node-cron');
const mail = require('./gmail')


// what we need to do is we have to set process after each 8 hours which will check status of all gitlab project mirroring status 
// and informe the project member/owner about the error if there is any..
// considering the fact that mirroring will occure only one way..


// mail("yashp_c19015@students.isquareit.edu.in , yashpanchwatkar@gmail.com")

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

// Schedule tasks to be run on the server. per min..
cron.schedule('* 1 * * *', function() {
    console.log('running a task every minute');
});

