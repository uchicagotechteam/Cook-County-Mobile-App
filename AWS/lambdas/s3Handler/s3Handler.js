const aws = require('aws-sdk');

function getS3Data(s3, params) {
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(JSON.parse(data.Body.toString('utf-8')));           // successful response
            return JSON.parse(data.Body.toString('utf-8'));
        }
    });
}

function putS3Data(s3, params) {
    s3.upload(params, function(err, data) {
        if (err) {
            console.log("Error creating the folder: ", err);
        } else {
            console.log("Successfully created a folder on S3");
        }
    });
}