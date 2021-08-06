import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import ChannelCollectionOrg from "../components/ChannelCollectionOrg.js";
import { styles, api_key } from '../scripts/constants.js'
import ToggleSearch from "../components/ToggleSearch.js";
//export const DataContext = React.createContext({})
//<DataContext.Provider value={playlistResponseData}> </DataContext.Provider>
function NewhomeScreen({ navigation }) {
	const channel = {
    channelTitle : "Partner TEST NAME",
    channelImage : "golden",
    playlistId : "PL8jD_SDw-fZqzl-nvDm_j-rkgftFwsy0V",
    image_id: "1IuCEcIGstbYhj22wZqcn2HBMO600bCHm",
  }; 
  let [playlistResponseData, setPlaylistResponseData] = useState('');
  let [channelResponseData, setChannelResponseData] = useState('');
  let [channels, setChannels] = useState([]);
  let [bannerDescription, setBannerDescription] = useState('');

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const ccbChannel = "UC9SjusI9nKPmLefg3Sz6w9A";


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
      console.log("API call home")
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
        //console.log("ARRAY")
        //console.log(playlistArray);
        setChannels(playlistArray);
      }) 
      .catch((error) => {
        console.log("Axios error org page");
        console.log(error);
      })
    }
     
    fetchChannels(ccbChannel);
    //console.log(JSON.stringify(channels))
    console.log("CHANNELS")
    console.log(channels)
 /*  
const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('key', jsonValue)
  } catch(e) {
    // save error
  }

  console.log('Done')
} 
setObjectValue(channels) */
    //let saveChannels = JSON.stringify(channels)
    //AsyncStorage.setItem('dataAPI',saveChannels)
  
  }, [])
  
  
   
  const getChannel = useCallback(() =>{
    console.log("Getting the child screen with channel length: " + channels.length);
    //console.log(playlistResponseData)
    return (
      <ChannelCollectionOrg
        channels={channels}
        navigation={navigation}
      />
    )
  }, [channels]);

	return(
    <View>
		
    
    <View>
	        <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.navigate('Org', {channels}) }>	 
	         	<Image style = {styles.logo} source={require('../images/flower.png')} />     
	        </TouchableOpacity>
		</View>

    
    </View>

		);

};




export default NewhomeScreen;