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
 const API_KEY = "hello world"; // dummy value to build

 // TODO: right now the url passed into axios just gets basic stats of the channel by username
 // read Youtube Data API docs to find what methods we need to list the channel's playlists and list videos for a playlist
 // we need a video ID to be able to render that video in the IFrame
 // docs here: https://developers.google.com/youtube/v3/docs/channels/list

  // logic to fetch data from youtube api
  const fetchData = useCallback(() => {
    axios({
      "method": "GET",
      "url": `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=GoogleDevelopers&key=${API_KEY}`
      
    })
    .then((response) => {
      setResponseData(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  // useEffect function runs when function initially loads
  // and runs again whenever there is a change to data in second argument array (fetchData)
  // beware of infinite loops
  useEffect(() => {
    fetchData()
  }, [fetchData])


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
