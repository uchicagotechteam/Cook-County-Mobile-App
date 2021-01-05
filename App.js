import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';


export default function App() {

  // logic to maintain state of video play status
  const [playing, setPlaying] = useState(false);

  // logic to send alert when video ends
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
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
 const API_KEY = 'AIzaSyDjPXW02VUyBCE_NdYof8__iGIo8IoFJGQ'; // RITHVIK'S API KEY
 const channelID = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'; 
 const maxResults = 50; //max number of results (i.e playlists from a channel or vids in a playlist). shouldn't be too much for the school's youtube channel, but i'm just setting it to 50 for now.

 // TODO: right now the url passed into axios just gets basic stats of the channel by username
 // read Youtube Data API docs to find what methods we need to list the channel's playlists and list videos for a playlist
 // we need a video ID to be able to render that video in the IFrame
 // docs here: https://developers.google.com/youtube/v3/docs/channels/list

  // logic to fetch data from youtube api

  const fetchData = useCallback( async () => {
      var videoUrls = await getChannelVids();
      console.log("VIDEO URLS: "+ videoUrls);
      setResponseData("VIDEO URLS: "+videoUrls);
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

        // wait until all promises resolve -> needed for async call
        const channelVideoUrlList = await Promise.all(playlists);

        return channelVideoUrlList;

    }catch(err){
        console.log(err);
        return err;
    }
}

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      <Text>{JSON.stringify(responseData)}</Text>
    </View>
  );
}
