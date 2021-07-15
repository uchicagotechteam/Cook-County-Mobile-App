import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { styles, api_key } from '../scripts/constants.js'
import LogoTitle from '../components/LogoTitle.js';
import SearchArea from '../components/SearchArea';
import ChannelCollection from "../components/ChannelCollection.js";
//import RainbowChannel from "../components/RainbowChannel.js";
import ToggleSearch from "../components/ToggleSearch.js";
import RoundedButton from "../components/RoundedButton.js";




function OrgScreen({ navigation }) {
	const [searchText, setSearchText] = useState("");
  	const [searchActive, setSearchActive] = useState(false);
  	const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});

	const channel = [{
    channelTitle : "Golden Apples",
    channelImage : "../assets/images/golden_channel.jpeg",
    playlistId : "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
    image_id: "1IuCEcIGstbYhj22wZqcn2HBMO600bCHm",
  }];

  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UCLcTO4BeO0tlZFeMS8SKLSg";


  // Function to update the text search results
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);

  // Function to update the date search results
  const updateDates = useCallback((dateRestriction, afterDate, beforeDate) => {
    console.log("New restriction: " + dateRestriction);
    setDateInfo({dateRestriction, afterDate, beforeDate});
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ToggleSearch onPress={active => {setSearchActive(active);}} />
      ),
    });
  }, [navigation]);

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
  
  
   
  const getRainbowTheatre = useCallback(() =>{
    console.log("Getting the child screen with channel length: " + channels.length);
    return (
      <ChannelCollection
        channels={channels}
        isAdult={false}
        navigation={navigation}
      />
    )
  }, [channels]);
  return (
    <View>
    <SearchArea
      updateSearch={updateSearch}
      updateDates={updateDates}
      searchText={searchText}
      active={searchActive}
    />

    <LogoTitle channel={channel}/>

    <ScrollView>
      <View style={{ height: 5, }} />
      <View style={{ height: 20, }} />
      

      <View style={{ height: 10, }} />
      <View style={{backgroundColor: '#00C4C2', flex:1}}>
      <ScrollView horizontal={true} style={{height: styles.regLogo2.height+40, }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} >
	      
	      <Image
	        style={styles.regLogo2}
          source={require('../assets/images/rainbow.jpg')} //{props.channel.channelImage}
        />
        <Image
          style={styles.regLogo2}
	        source={require('../assets/images/rainbow.jpg')} //{props.channel.channelImage}
	      />
	      
      </ScrollView>
      </View>
      <View style={{ height: 50, }} />
      <RoundedButton
          onPress={() => alert('Button clicked (change later)')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text= "See all channel worksheets"                       
        />
      <View style={{ height: 60, }} />
    </ScrollView>
     { getRainbowTheatre() }
      

    </View>
  );

}

export default OrgScreen;