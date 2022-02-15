const axios = require('axios');
const aws = require('aws-sdk');
const s3Handler = require('./s3Handler/s3Handler');
const dateFormat = require('dateformat');

const api_key    = "AIzaSyAvJKBDG3iziQ-oyIG5gch4P6qPfDj69tg";

const bucket_name = "playlist-cache"

const playlist_bucket = "playlists/"
const playlist_file   = "playlists.json";

const featurePlaylistId = 'PL8GKxgb3LyNfMyc2RdPDseNYZeyHF3CN8';

function uploadToS3(s3, bucket, key, obj) {
    var buffer = Buffer.from(JSON.stringify(obj));

    var params = {
        Bucket: bucket || bucket_name,
        Key: key,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
        ACL: 'public-read'
    }

    s3Handler.putS3Data(s3, params);
}

function getS3Data(s3, params) {
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(JSON.parse(data.Body.toString('utf-8')));           // successful response
            return JSON.parse(data.Body.toString('utf-8'));
        }
    });
}

function youtube_API_Get_Playlist(playlistId) {
    return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&playlistId=${playlistId}&key=${api_key}`
}

function axiosGET(url) {
    var request = axios.get(url);
    
    var data = request.then(response => {
        console.log(response);
        return response.data;
    })
    .catch(error => {
        console.log("ERROR:");
        console.log(error);
        return Promise.reject(error);
    })

    return data;
}

function buildVideoMetadata(video) {
    var date = new Date(video.snippet.publishedAt);

    var videoMetadata = {
        videoId: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        date: video.snippet.publishedAt,
        dateString: dateFormat(date, "mm/dd/yy"),
        description: video.snippet.description, // concat prior to "LINK" in description
        link: "LINK:", // Concat after "LINK" in description
        thumbnail: {
            url: video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.default.url,
            width: video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.width : video.snippet.thumbnails.default.width,
            height: video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.height : video.snippet.thumbnails.default.height
        }
    }

    console.log(videoMetadata);

    return videoMetadata;
}

async function playlistUploadHandler(playlistId, s3) {
    var youtubePlaylistAPI = youtube_API_Get_Playlist(playlistId);

    //var data = await axiosGET(youtubePlaylistAPI);
    var data = await axiosGET(youtubePlaylistAPI);

    var videosList = data.items.filter(video => video.status.privacyStatus != 'private');
    //console.log(data);
    /* THIS WORKS
    var response = await axios.get(youtubePlaylistAPI);

    if(response.status == 200) {
        console.log("success!");
        console.log(response);
    }

    */

    var temp = videosList[0];

    videosList.forEach((element) => {
        var videoMetadata = buildVideoMetadata(element);

        uploadToS3(s3, bucket_name, `${playlist_bucket}${playlistId}/${videoMetadata.videoId}.json`, videoMetadata);
    });
}


exports.handler = async function(event, context, callback) {
    const s3 = new aws.S3({ 
        apiVersion: '2006-03-01',
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: 'us-east-2'
    });
    
    //var params = {Bucket: bucket_name, Key: "playlists/playlists.json"};
    var params = {Bucket: bucket_name, Key: `${playlist_bucket}${playlist_file}`};

    
    var playlists = await s3Handler.getS3DataAsync(s3, params);
    
    playlists.channels.forEach(async (element) => {
        playlistUploadHandler(element.playlistId, s3);
    });

    playlistUploadHandler(featurePlaylistId, s3);
};
