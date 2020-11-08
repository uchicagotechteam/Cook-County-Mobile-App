import React from 'react';

const { google } = require('googleapis');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            urls: '?'
        }
    }

    componentDidMount() {
        this.getLinks().done()
    }

    async getChannelVids (channelId) {
        try{
            //CHANNEL LIST INFO RETRIEVER - just gets info from the channel. We get this channel by querying for the channel's unique channelId
            let response = await google.youtube('v3').channels.list({    
                key: "AIzaSyDjPXW02VUyBCE_NdYof8__iGIo8IoFJGQ",
                part: 'contentDetails', 
                id:channelId, 
                maxResults:50 }
            );
            
            //UPLOAD PLAYLIST INFO RETRIEVER - gets the uploads playtlist from the channel we found by querying for the channel's channel id. We can change this to different playlists the channel has as we go along though i.e a math playlist, science playlist, english playlist, etc
            var channelPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads;
            console.log(channelPlaylistId);
            let resultList = await google.youtube('v3').playlistItems.list({    
                key: "AIzaSyDjPXW02VUyBCE_NdYof8__iGIo8IoFJGQ",
                part: 'snippet',  
                playlistId:channelPlaylistId,
                maxResults:50
            });
    
            //UPLOADS CONSOLIDATOR - this gets the info of all the videos in uploads playlist. It just cycles through each item in the list of videos from the playlist and puts the info we want (that is only the URL for now) into our urlList array
            var urlList = [];
            resultList.data.items.forEach(item=>{
                const videoId = item.snippet.resourceId.videoId;
                const url = "http://www.youtube.com/watch?v="+videoId;
                urlList.push(url);
            });
            return urlList; //spits out all the urls of the videos in the uploads playlist (I think it's capped at 50 rn but there's definitely a way to get more videos than that. We could do some more work into this later this week)
        }catch(err){
            console.log(err);
            return err;
        }
    };

    async getLinks(){
        const channelId = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'; //temp channel id
        let urlList = await App.getChannelVids(channelId);
        this.setState({urlList})
    };

    render() {
        return (
                "Hello world"
        );
    }
}

export default App;
