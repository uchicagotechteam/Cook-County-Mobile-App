import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import RainbowTheater from "../components/RainbowTheater.js";
import { styles, api_key } from '../scripts/constants.js'
import axios from 'axios';

function ChildScreen({ navigation }) {
  // logic to maintain state of request to youtube API
  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";
  // const channels = [{
  //   channelTitle : "Golden Apples",
  //   channelImage : "golden",
  //   playlistId : "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
  // },
  // {
  //   channelTitle : "CDEFG Music!",
  //   channelImage : "music",
  //   playlistId : "PLydZ2Hrp_gPRpfRjuzArwtmlD5TDGIUql",
  // },
  // {
  //   channelTitle : "Without Further Ado",
  //   channelImage : "interview",
  //   playlistId : "PLSQl0a2vh4HAxgGKXD5Oc_eELflPEddPx",
  // },
  // {
  //   channelTitle : "Forest Reserve",
  //   channelImage : "forest",
  //   playlistId : "PLvahqwMqN4M0GRkZY8WkLZMb6Z-W7qbLA",
  // },
  // {
  //   channelTitle : "Brookfield Zoo",
  //   channelImage : "zoo",
  //   playlistId : "PLH8c8f3_r5t5jObPDlNNMQo0aMv52stCz",
  // },
  // {
  //   channelTitle : "Botanical Garden",
  //   channelImage : "garden",
  //   playlistId : "PL-WIU6_H4uiQGUipeRB7STrAA9SQhQ0io",
  // },
  // ];
  
  // useEffect function runs when function initially loads
  // and runs again whenever there is a change to data in second argument array (fetchData)
  // beware of infinite loops
  useEffect(() => {
    // logic to fetch data from youtube api
    const fetchChannels = function(channelId) {
      console.log("Playlists from https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key
      })
      .then((response) => {
        setPlaylistResponseData(response.data)

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let playlistArray = response.data.items.map(playlist => {
          return {
            playlistId: playlist.id,
            channelTitle: playlist.snippet.title,
            channelImage : playlist.snippet.description
          }
        });
        console.log(playlistArray);
        setChannels(playlistArray);
      })
      .catch((error) => {
        console.log("Axios error");
        console.log(error);
      })
    }
    
    const fetchBanner = function(channelId) {
      console.log("Banner - " + channelId);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&maxResults=50&id=" + channelId + "&key=" + api_key
      })
      .then((response) => {
        setChannelResponseData(response.data);
        if(response.data.items.length > 0){
          let description = response.data.items[0].snippet.description; 
          console.log(description)
          setBannerDescription(description);
        } else {
          console.log("No channels matched that id");
        }
      })
      .catch((error) => {
        console.log("Axios error");
        console.log(error);
      })
    }
    
    fetchChannels(ccbChannel);
    fetchBanner(ccbChannel);
  }, [])
  
  // useEffect(() => {
  //   if (channels.length > 0) {
  //     console.log("Channels has been set");
  //     console.log(channels);
  //   }
  // }, [channels]);
   
  const getRainbowTheatre = useCallback(() =>{
    console.log("Getting the child screen with channel length: " + channels.length);
    return (
      <RainbowTheater
        channels={channels}
        isAdult={false}
        navigation={navigation}
      />
    )
  }, [channels]);

  return (
    <View>
      <View style={{ height: 5, }} />
      { /* <View style={styles.centerColumn}>
        <Image
          style={styles.miniLogo}
          source={require('../images/PR_logo.png')}
        />
      </View> */ }
      <View style={{ height: 20, }} />

      <Text style={styles.titleText}> Student Page </Text>

      <View style={{ height: 20, }} />
      
      { getRainbowTheatre() }

      { /* <Image
        style={styles.regLogo}
        source={require('../images/rainbow.jpg')}
      />
      <View style={{ height: 60, }} />
      <Image
        style={{width: 380, height: 410, alignItems: 'center', justifyContent: 'center'}}
        source={require('../images/nav_layout.png')}
      />
      <Text style={styles.baseText}> * Need to replace the above image with a similar layout navigation bar, with videos ordered by date and title </Text>
      */ }
      {/* Vertical padding */}
      {/* <View style={{ height: 60, }} /> */}

      {/* Download video button */}
      { /* <Text style={styles.titleText}> Download Today's {"\n"} Video! </Text> */ }
      {/* Vertical padding */}
      { /* <View style={{ height: 20, }} />
      <TouchableHighlight
        onPress={() => alert('Button clicked (change later)')}
        style={{alignItems: 'center',}}>
          <Image
            style={{width: 100, height: 125, transform: [{ rotate: '180deg' }]}}
            source={require('../images/up_arrow.png')}
          />
      </TouchableHighlight> */ }
    </View>
  );
}

export default ChildScreen;