const aws = require('aws-sdk');

exports.getS3Data = function(s3, params) {
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(JSON.parse(data.Body.toString('utf-8')));           // successful response
            return JSON.parse(data.Body.toString('utf-8'));
        }
    });
}

exports.getS3DataAsync = async function(s3, params) {
    try {
        const data = await s3.getObject(params).promise();

        var responseObject = JSON.parse(data.Body.toString('utf-8'))

        console.log(responseObject);           // successful response
        return responseObject;

    }
    catch (e) {
        console.log(e, e.message);
    }
}


exports.putS3Data = function(s3, params) {
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(err);
            console.log("Error uploading data: ", data);
        } else {
            console.log("Successfully uploaded to S3");
        }
    });
}