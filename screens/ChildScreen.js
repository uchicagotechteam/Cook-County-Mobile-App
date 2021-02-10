import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';
import RainbowChannel from "../components/RainbowChannel.js";
import { styles } from '../scripts/constants.js'

function ChildScreen({ navigation }) {
    // logic to maintain state of search text and map from each channel to its array of videos
    const [searchText, setSearchText] = useState("");
    const [videoArrays, setVideoArrays] = useState([]);
    const [otherString, setOtherString] = useState("");

    // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
    const channels = [{
      channelTitle : "Golden Hours",
      channelImage : "golden",
      playlistId : "PLydZ2Hrp_gPTfidzAvRI524ZM0S2ZefF7"
    },
    {
      channelTitle : "Music Channel",
      channelImage : "music",
      playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql"
    }];

    /*
    ,{
      channelTitle : "Music Channel",
      channelImage : "music",
      playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql"
    }
    */

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
    const fetchData = useCallback((playlistId, index, localVideoArrays) => {
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=" + playlistId + "&key=" + API_KEY
      })
      .then((response) => {
        setResponseData(response.data)

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let videoArray = response.data.items.map(video => {
          let date = new Date(video.contentDetails.videoPublishedAt);
          return {
            videoId: video.contentDetails.videoId,
            title: video.snippet.title,
            date : date,
            dateString : date.toLocaleDateString("en-US")
          }
        }).sort((a, b) => b.date - a.date);

        // Joins all the ids in the channel to make a query for the video durations.
        // IMPORTANT: The API is limited to 50 videoIds per query (according to stack overflow, haven't tried it myself), so so if channels can have more than 50 videos, we would need to do this in batches of 50.
        let ids = videoArray.map(video => video.videoId).join(',');

        axios({
          "method": "GET",
          "url": "https://www.googleapis.com/youtube/v3/videos?id=" + ids + "&part=contentDetails&key=" + API_KEY
        })
        .then((durationResponse) => {

          let durations = durationResponse.data.items.map(video => {
            let duration = video.contentDetails.duration;
            return duration;
          })

          if(durations.length == videoArray.length){
            for(var i = 0; i < videoArray.length ; i++){
              videoArray[i]["duration"] = durations[i];
            }
          }

          // Adds the video array to newVideoArrays, which accumulates objects with the index of the channel and the video array
          const newVideoArrays = [...localVideoArrays, {index, videoArray}];
          if(index + 1 < channels.length){
            fetchData(channels[index+1].playlistId, index+1, newVideoArrays);
          } else {
            // Once all the fetches have been accumulated, set the array of video arrays in state.
            // Note: I tried to do run the fetchdata requests in parallel for a bit, but it got pretty ugly and changed things so the next request would only start once the previous one finished. I might return and try parallel requests again later though
            setVideoArrays(newVideoArrays);
            // console.log("New video array " + JSON.stringify(newVideoArrays));
          }
        })
        .catch((error) => {
        console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    const getVideoArrayByIndex = useCallback((channel, index) =>{
      let arrayMatches = videoArrays.filter(videoObject => videoObject.index == index)
      if(arrayMatches.length > 0){
        let match = arrayMatches[0];
        return match.videoArray;
      } else {
        return [];
      }
    }, [videoArrays]);

    // Function to update the search results
    const updateSearch = useCallback((search) => {
      setSearchText(search);
    }, []);

    // useEffect function runs when function initially loads
    // and runs again whenever there is a change to data in second argument array (fetchData)
    // beware of infinite loops
    useEffect(() => {
      // If there are any channels, begin fetching from the channel at index 0
      if(channels.length > 0){
        fetchData(channels[0].playlistId, 0, []);
      }
    }, [])

  return (
    <ScrollView>
      <Image
        style={styles.flatLogo}
        source={require('../images/simple_rainbow.png')}
      />
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Child View </Text>

      <View style={{ height: 20, }} />
      <SearchBar
        placeholder="Search title or date"
        onChangeText={updateSearch}
        value={searchText}
        platform={"android"}
        round={true}
      />
      <View style={{ height: 20, }} />
      { channels.map((channel, index) =>
        <RainbowChannel
          videoArray={getVideoArrayByIndex(channel, index)}
          channelTitle={channel.channelTitle}
          channelImage={channel.channelImage}
          currentSearch={searchText}
        />) }

      <Image
        style={styles.regLogo}
        source={require('../images/rainbow.jpg')}
      />
      <View style={{ height: 60, }} />
      <Image
        style={{width: 380, height: 410, alignItems: 'center', justifyContent: 'center'}}
        source={require('../images/nav_layout.png')}
      />
      <Text style={styles.baseText}> * Need to replace the above image with a similar layout navigation bar, with videos ordered by date and title </Text>

      {/* Vertical padding */}
      <View style={{ height: 60, }} />

      {/* Download video button */}
      <Text style={styles.titleText}> Download Today's {"\n"} Video! </Text>
      {/* Vertical padding */}
      <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125, transform: [{ rotate: '180deg' }]}}
            source={require('../images/up_arrow.png')}
          />
      </TouchableHighlight>
    </ScrollView>
  );
}

export default ChildScreen;