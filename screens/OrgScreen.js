import React, { useContext } from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage} from 'react-native';
import { styles, api_key } from '../scripts/constants.js'
import LogoTitle from '../components/LogoTitle.js';
import SearchArea from '../components/SearchArea';
import ChannelCollectionOrg from "../components/ChannelCollectionOrg.js";
//import RainbowChannel from "../components/RainbowChannel.js";
import ToggleSearch from "../components/ToggleSearch.js";
import RoundedButton from "../components/RoundedButton.js";
//import { DataContext } from '../App';


//props needed: image id (from google drive), organization name, link to worksheet google drive, playlist id

function OrgScreen({ route, navigation }) {
	//const data = useContext(DataContext);
  //const { apiData } = data || {};
  //console.log("*************API DATA***************");
  //console.log(apiData);
  /*
  _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('dataAPI');
    if (value !== null) {
      // We have data!!
      console.log("OUTPUT**************")
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};*/
/*
async function getItem(key) {
  try {
    await AsyncStorage.getItem(key); 
    return value;
  } catch (error) {
  }
}
const channel = getItem('dataAPI')
console.log(channel)
console.log(JSON.parse(channel))
*/

/*
const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@key')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log(e)
  }

  console.log('Done.')

} */

  const channelHardCode = {
    channelTitle : "Partner TEST NAME",
    channelImage : "golden",
    playlistId : "PL8jD_SDw-fZqzl-nvDm_j-rkgftFwsy0V",
    image_id: "1IuCEcIGstbYhj22wZqcn2HBMO600bCHm",
  }; 
console.log(channelHardCode);

const channel = route.params.channels[1];
//channel= channel.channels[0];
console.log("FINALLY!!!");
console.log(channel);

	const [searchText, setSearchText] = useState("");
  	const [searchActive, setSearchActive] = useState(false);
  	const [dateInfo, setDateInfo] = useState({dateRestriction : "Anytime", afterDate : null, beforeDate : null});


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
    	//console.log(channel.playlistId)
      console.log("Playlists from https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key);
      axios({
        "method": "GET",
        "url": "https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&channelId=" + channelId + "&key=" + api_key
      })
      .then((response) => {
        setPlaylistResponseData(response.data)

        // Maps the youtube API response to an array of objects with the information necessary to prepare a video, and then sorts the videos by date (from latest to oldest)
        let playlistArray = response.data.items.filter(playlist => {
  if (playlist.id.localeCompare(channel.playlistId) == 0) {
    return true; 
  }
  return false;
}).map(playlist => { 
        //console.log(playlist.id)
        //console.log(channel.playlistId)
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
  }, [])
  
  
   
  const getChannel = useCallback(() =>{
    console.log("Getting the child screen with channel length: " + channels.length);
    return (
      <ChannelCollectionOrg
        channels={channels}
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

    <RoundedButton
          onPress={() => alert('Button clicked (change later)')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text= "See All Channel Worksheets"                       
        />

    <ScrollView>

      <View style={{ height: 10 }} />
      

      { getChannel() }



    </ScrollView>
      

    </View>
  );

}

export default OrgScreen;