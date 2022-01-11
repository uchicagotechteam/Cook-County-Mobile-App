const axios = require('axios');
const aws = require('aws-sdk');

const playlistId = "PL8GKxgb3LyNcB01ujLEDS1NH27YqYsOmD";
const api_key    = "AIzaSyAvJKBDG3iziQ-oyIG5gch4P6qPfDj69tg";
const token_text = "";

const api_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=50&playlistId=" + playlistId + "&key=" + api_key

const bucket_name = "playlist-cache"

const playlist_bucket = "/playlists"
const playlist_file   = "playlist.json";


function getS3Data(s3, params) {
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(JSON.parse(data.Body.toString('utf-8')));           // successful response
            return JSON.parse(data.Body.toString('utf-8'));
        }
    });
}


function get_playlist_data() {
    axios({
    	"method": "GET",
    	"url": api_url
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })
    
    return '{"test": "test"}';
}



exports.handler = function(event, context, callback) {
    const s3 = new aws.S3({ apiVersion: '2006-03-01' });
    
    var params = {Bucket: bucket_name, Key: playlist_file};
    
    getS3Data(s3, params);

    /*
    var fileData = JSON.stringify(get_playlist_data());

    function uploadFileOnS3(fileData, fileName) {
        const params = {
            Bucket: bucket_name,
            Key:    file_name,
            Body:   fileData
        };
        try {
            const response = s3.upload(params).promise();
            console.log('Response: ', response);
            return response;
    
        } catch (err) {
            console.log(err);
        }
    }
    
    uploadFileOnS3(fileData,fileName);*/
};
