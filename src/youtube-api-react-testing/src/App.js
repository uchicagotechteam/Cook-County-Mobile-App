import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from "react";

function App() {
    // logic to maintain state of video play status
    const [playing, setPlaying] = useState(false);

    // logic to send alert when video ends
    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        alert.alert("video has finished playing!");
      }
    }, []);
  
    // logic for play/pause button
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);
  
    // logic to maintain state of request to youtube API
    let [responseData, setResponseData] = useState('');
  
    // TODO: set up env vars with expo so that we can store API KEY in .env file
   // but we do need to see if there's a safer way to store the API key
   // since env variables are bundled into the app's build and thus can be exposed to clients after the app is shipped
   // more info here: https://docs.expo.io/guides/environment-variables/
   // const API_KEY = process.env.EXPO_CCMA_YT_API_KEY;
   const API_KEY = process.env.REACT_APP_API_KEY; // RITHVIK'S API KEY
   const channelID = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw';  //ID of the youtube channel we're querying for
   const maxResults = 50; //max number of results (i.e playlists from a channel or vids in a playlist). shouldn't be too much for the school's youtube channel, but i'm just setting it to 50 for now.
  
   // TODO: right now the url passed into axios just gets basic stats of the channel by username
   // read Youtube Data API docs to find what methods we need to list the channel's playlists and list videos for a playlist
   // we need a video ID to be able to render that video in the IFrame
   // docs here: https://developers.google.com/youtube/v3/docs/channels/list
  
    // logic to fetch data from youtube api
  
    const fetchData = useCallback( async () => {
        var videoData = await getChannelVids();
        console.log("VIDEO URLS: "+ videoData[0]);
        console.log("DESCS: "+ videoData[1]);
        setResponseData(videoData); 
        //the response is an array like so:
        //videoData[0] = array of video links
        //videoData[1] = array of links in description
    }, [])
  
    // useEffect function runs when function initially loads
    // and runs again whenever there is a change to data in second argument array (fetchData)
    // beware of infinite loops
    useEffect(() => {
      fetchData()
    }, [fetchData])
  
    //FUNCTION THAT RETRIEVES VIDEO URLS FROM CHANNEL ID
    async function getChannelVids () {
      try{
        console.log("ENV"+process.env.API_KEY);
        const get_playlists = `https://youtube.googleapis.com/youtube/v3/playlists?channelId=${channelID}&maxResults=${maxResults}&key=${API_KEY}`
          //CHANNEL PLAYLIST RETRIEVER - gets all an array the id's of all the playlists on a channel by the channel's unique channelId
          let response = await axios({
            "method": "GET",
            "url": get_playlists
          });
          
          //PLAYLIST INFO RETRIEVER - cycles through each playlist and retrieves an array of all the video url's in the playlist and puts the array into the playlists array
          var playlists = response.data.items.map(async item=>{
            const get_playlist_items_url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${item.id}&key=${API_KEY}`;
            const playlistItemResponse = await axios({
              "method": "GET",
              "url": get_playlist_items_url
            });
            var videoUrls = [];
            playlistItemResponse.data.items.forEach(item=>{
              videoUrls.push(item.snippet.resourceId.videoId);
            })
            return videoUrls;
          });

          var descs = response.data.items.map(async item=>{
            const get_playlist_items_url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${item.id}&key=${API_KEY}`;
            const playlistItemResponse = await axios({
              "method": "GET",
              "url": get_playlist_items_url
            });
            var videoDescs = [];
            playlistItemResponse.data.items.forEach(item=>{
              let re = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
              let foundLink = item.snippet.description.match(re)
              videoDescs.push(foundLink);
            })
            return videoDescs;
          });
  
          // wait until all promises resolve -> needed for async call
          const channelVideoUrlList = await Promise.all(playlists);

          const descsList = await Promise.all(descs);
  
          return [channelVideoUrlList, descsList];
  
      }catch(err){
          console.log(err);
          return err;
      }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
